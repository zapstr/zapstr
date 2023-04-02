import { writable } from 'svelte/store';
import NDK from '@nostr-dev-kit/ndk';

const ndk = new NDK({
    explicitRelayUrls: ['ws://localhost:8080', 'wss://nos.lol']
});

const ndkStore = writable(ndk);

export default ndkStore;
