import Dexie, { type Table } from 'dexie';

export interface User {
	id?: number;
	npub: string;
	name: string;
}

export class Database extends Dexie {
	users!: Table<User>;

	constructor() {
		super('myDatabase');
		this.version(1).stores({
			users: '++id, npub, name'
		});
	}
}

export const db = new Database();
