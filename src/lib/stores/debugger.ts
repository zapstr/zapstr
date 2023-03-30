export { NDKEvent } from 'nostr-dev-kit';
import { writable } from 'svelte/store';

export const debugEvent = writable<NDKEvent | undefined>();
