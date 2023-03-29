import { writable } from 'svelte/store';

export const settings = writable<App.Settings>({
    streamingZapsEnabled: true,
    streamingZaps: 1500
});
