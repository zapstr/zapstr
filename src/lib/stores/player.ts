import { writable } from 'svelte/store';

export class Player {
    public track: App.Track | undefined;
}

export const player = writable(new Player());
