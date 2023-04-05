import Dexie, { type Table } from 'dexie';

export class Database extends Dexie {
    listenedTracks!: Table<App.ListenedEvent>;
    playlists!: Table<App.Playlist>;
    tracks!: Table<App.Track>;
    users!: Table<App.UserProfile>;
    zaps!: Table<App.Zap>;

    constructor() {
        super('db');
        this.version(9).stores({
            listenedTracks: '++id, listener, listened, listenedTrack',
            playlists: '++id, name, pubkey, image, description, event',
            tracks: '++id, authors, genres, event',
            users: '++id, name, displayName, image, banner, bio, nip05, lud16, about, zapService',
            zaps: '++id, zapper, zappee, zapped, zappedEvent, amount, comment'
        });
    }
}

export const db = new Database();
