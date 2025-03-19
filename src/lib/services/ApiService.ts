import { StorageService } from './StorageService';

export class ApiService {
    private storage: StorageService;
    private baseUrl: string;
    private isOnline: boolean = navigator.onLine;
    private pendingRequests: Array<() => Promise<any>> = [];

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.storage = new StorageService();
        this.setupNetworkListeners();
    }

    private setupNetworkListeners(): void {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingRequests();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    private async syncPendingRequests(): Promise<void> {
        while (this.pendingRequests.length > 0 && this.isOnline) {
            const request = this.pendingRequests.shift();
            if (request) {
                await request();
            }
        }
    }

    private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const cacheKey = `${options.method || 'GET'}-${endpoint}`;

        try {
            if (this.isOnline) {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                await this.storage.saveToCache(cacheKey, data);
                return data;
            } else {
                // В офлайн-режиме возвращаем кэшированные данные
                const cachedData = await this.storage.getFromCache(cacheKey);
                if (cachedData) {
                    return cachedData;
                }
                throw new Error('No cached data available');
            }
        } catch (error) {
            if (this.isOnline) {
                // Если онлайн, но запрос не удался, пробуем получить кэшированные данные
                const cachedData = await this.storage.getFromCache(cacheKey);
                if (cachedData) {
                    return cachedData;
                }
            }
            throw error;
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.makeRequest<T>(endpoint);
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        const request = async () => {
            return this.makeRequest<T>(endpoint, {
                method: 'POST',
                body: JSON.stringify(data),
            });
        };

        if (this.isOnline) {
            return request();
        } else {
            this.pendingRequests.push(request);
            throw new Error('Request queued for offline mode');
        }
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
        const request = async () => {
            return this.makeRequest<T>(endpoint, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
        };

        if (this.isOnline) {
            return request();
        } else {
            this.pendingRequests.push(request);
            throw new Error('Request queued for offline mode');
        }
    }

    async delete<T>(endpoint: string): Promise<T> {
        const request = async () => {
            return this.makeRequest<T>(endpoint, {
                method: 'DELETE',
            });
        };

        if (this.isOnline) {
            return request();
        } else {
            this.pendingRequests.push(request);
            throw new Error('Request queued for offline mode');
        }
    }
}
