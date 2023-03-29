import Dexie, { type Table } from 'dexie';

export class Database extends Dexie {
    users!: Table<App.UserProfile>;
    listenedTracks!: Table<App.ListenedEvent>;
    tracks!: Table<App.Track>;
    zaps!: Table<App.Zap>;

    constructor() {
        super('db');
        this.version(7).stores({
            users: '++id, name, displayName, image, banner, bio, nip05, lud16, about, zapService',
            listenedTracks: '++id, listener, listened, listenedTrack',
            tracks: '++id, authors, genres',
            zaps: '++id, zapper, zappee, zapped, zappedEvent, amount, comment'
        });
    }
}

export const db = new Database();
