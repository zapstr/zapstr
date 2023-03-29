import { get as getStore } from 'svelte/store';
import ndkStore from '$lib/stores/ndk';
import { liveQuery } from 'dexie';
import { browser } from '$app/environment';
import { db } from '$lib/interfaces/db';
import type NDK from 'ndk';
import type { NDKEvent, NDKFilter } from 'ndk';

interface ListenedToArgs {
	trackId?: string;
	userId?: string;
}

const ListenInterface = {
	listenedTo: (args: ListenedToArgs) => {
		const filter: NDKFilter = { kinds: [1338] };
		if (args.trackId) filter['#e'] = [args.trackId];
		if (args.userId) filter['#p'] = [args.userId];

		const ndk: NDK = getStore(ndkStore);
		const subs = ndk.subscribe(filter);

		subs.on('event', async (event: NDKEvent) => {
			const publisher = event.getMatchingTags('p')[0][1];
			const listenedTrack = event.getMatchingTags('e')[0][1];

			await db.listenedTracks.put({
				id: event.id,
				listener: event.pubkey,
				publisher,
				listenedTrack
			});
		});

		if (args.userId) {
			return liveQuery(() =>
				browser ? db.listenedTracks.where({ listened: args.userId }).toArray() : []
			);
		} else if (args.trackId) {
			return liveQuery(() =>
				browser ? db.listenedTracks.where({ listenedTrack: args.trackId }).toArray() : []
			);
		}
	}
};

export default ListenInterface;
