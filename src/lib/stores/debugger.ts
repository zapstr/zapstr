export {NDKEvent} from 'ndk';
import { writable } from 'svelte/store';

export const debugEvent = writable<NDKEvent | undefined>();