import { get as getStore } from 'svelte/store';
import ndkStore from '$lib/stores/ndk';
import { liveQuery, type Observable } from 'dexie';
import { browser } from '$app/environment';
import { db } from '$lib/interfaces/db';
import { ZapstrKind } from '$lib/types';
import type NDK from '@nostr-dev-kit/ndk';
import type { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';

function valueFromTag(event: NDKEvent, tag: string): string | undefined {
    const matchingTag = event.tags.find((t: string[]) => t[0] === tag);

    if (matchingTag) return matchingTag[1];
}

const PlaylistInterface = {
    add: async (playlistEvent: NDKEvent) => {
        await db.playlists.put({
            id: playlistEvent.tagId(),
            pubkey: playlistEvent.pubkey!,
            name: valueFromTag(playlistEvent, 'subject')!,
            event: JSON.stringify(await playlistEvent.toNostrEvent())
        });
    },

    from: (userIds: string[] | undefined): Observable<App.Playlist[]> => {
        const filter: NDKFilter = { kinds: [ZapstrKind.Playlist] };

        const ndk: NDK = getStore(ndkStore);
        const subs = ndk.subscribe(filter);subs.on('event', async (event: NDKEvent) => {
            const title = valueFromTag(event, 'subject');
            const image = valueFromTag(event, 'image');

            if (!title) return;

            try {
                const playlist: App.Playlist = {
                    id: event.tagId(),
                    pubkey: event.pubkey,
                    name: title,
                    event: JSON.stringify(await event.toNostrEvent())
                };
                if (image) playlist.image = image;

                await db.playlists.put(playlist);
            } catch (e) {
                console.error(e);
            }
        });

        if (userIds) {
            return liveQuery(() =>
                browser ? db.playlists.where({ pubkey: userIds[0] }).toArray() : []
            );
        } else {
            return liveQuery(() => (browser ? db.playlists.toArray() : []));
        }
    }
};

export default PlaylistInterface;
