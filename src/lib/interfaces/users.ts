import { get as getStore } from 'svelte/store';
import ndkStore from '$lib/stores/ndk';
import type { GetUserParams } from 'ndk';
import { liveQuery, type Observable } from 'dexie';
import { browser } from '$app/environment';
import { db } from '$lib/interfaces/db';

const UserInterface = {
	get: (opts: GetUserParams): Observable<App.UserProfile> => {
		const ndk = getStore(ndkStore);
		const user = ndk.getUser(opts);
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
