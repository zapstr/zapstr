import { get as getStore } from 'svelte/store';
import ndkStore from '$lib/stores/ndk';
import type { GetUserParams } from '@nostr-dev-kit/ndk';
import { liveQuery, type Observable } from 'dexie';
import { browser } from '$app/environment';
import { db } from '$lib/interfaces/db';

const UserInterface = {
    get: (opts: GetUserParams): Observable<App.UserProfile> => {
        // const users = db.users.where({ id: user.hexpubkey() }).first()

        const ndk = getStore(ndkStore);
        const user = ndk.getUser(opts);
        console.log('get user', opts);
        let userProfile = { ...(user.profile || {}), id: user.hexpubkey() };
        user.fetchProfile().then(async () => {
            userProfile = { ...userProfile, ...(user.profile || {}) };
            await db.users.put(userProfile);
        });

        return liveQuery(() =>
            browser ? db.users.where({ id: user.hexpubkey() }).first() || userProfile : userProfile
        ) as Observable<App.UserProfile>;
    }
};

export default UserInterface;
