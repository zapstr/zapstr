import { writable } from 'svelte/store';

export const addToPlaylist = writable<App.Track | undefined>();
