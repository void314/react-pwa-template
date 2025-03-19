import Dexie, { type EntityTable } from 'dexie';

interface Friend {
    id: number;
}

const db = new Dexie('POSDB') as Dexie & {
    friends: EntityTable<Friend, 'id'>; // primary key "id" (for the typings only)
};

db.version(1).stores({
    friends: '++id', // primary key "id" (for the runtime!)
});

export type { Friend };
export { db };
