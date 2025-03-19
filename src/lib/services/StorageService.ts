export class StorageService {
    private db: IDBDatabase | null = null;
    private readonly dbName = 'posPWA';
    private readonly version = 1;

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Создаем хранилище для кэшированных запросов
                if (!db.objectStoreNames.contains('apiCache')) {
                    db.createObjectStore('apiCache', { keyPath: 'id' });
                }
            };
        });
    }

    async saveToCache(key: string, data: any): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(['apiCache'], 'readwrite');
            const store = transaction.objectStore('apiCache');
            const request = store.put({ id: key, data, timestamp: Date.now() });

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getFromCache(key: string): Promise<any> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(['apiCache'], 'readonly');
            const store = transaction.objectStore('apiCache');
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result?.data);
            request.onerror = () => reject(request.error);
        });
    }

    async clearCache(): Promise<void> {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(['apiCache'], 'readwrite');
            const store = transaction.objectStore('apiCache');
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}
