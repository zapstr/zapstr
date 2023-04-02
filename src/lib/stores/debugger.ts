export { NDKEvent } from '@nostr-dev-kit/ndk';
import { writable } from 'svelte/store';

export const debugEvent = writable<NDKEvent | undefined>();
