import type { NDKUser } from '@nostr-dev-kit/ndk';
import { writable } from 'svelte/store';

export const currentUser = writable<NDKUser | undefined>();
export const displayUserProfile = writable<App.UserProfile | undefined>();
