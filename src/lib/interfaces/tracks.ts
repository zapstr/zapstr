import { get as getStore } from 'svelte/store';
import ndkStore from '$lib/stores/ndk';
import { liveQuery } from 'dexie';
import { browser } from '$app/environment';
import { db } from '$lib/interfaces/db';
import type NDK from '@nostr-dev-kit/ndk';
import type { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';

function valueFromTag(event: NDKEvent, tag: string): string | undefined {
    const matchingTag = event.tags.find((t: string[]) => t[0] === tag);

    if (matchingTag) return matchingTag[1];
}

function allValuesFromTag(event: NDKEvent, tag: string): string[] {
    return event.tags.filter((t: string[]) => t[0] === tag).map((t: string[]) => t[1]) || [];
}

const TrackInterface = {
    trackFrom: (userId?: string) => {
        const filter: NDKFilter = { kinds: [31337] };
        if (userId) filter['authors'] = [userId];

        const ndk: NDK = getStore(ndkStore);
        const subs = ndk.subscribe(filter);

        subs.on('event', async (event: NDKEvent) => {
            const subject = valueFromTag(event, 'subject');
            const coverImage = valueFromTag(event, 'cover');
            const genres = allValuesFromTag(event, 'c');
            const mediaTags = event.tags.filter((tag: string[]) => tag[0] === 'media');

            if (!subject) return;

            try {
                const track: App.Track = {
                    id: event.tagId(),
                    authors: [event.pubkey],
                    name: subject,
                    genres: [genres[0]],
                    event: JSON.stringify(await event.toNostrEvent())
                };
                if (coverImage) track.cover = coverImage;

                const media = new Map<string, string[]>();
                mediaTags.forEach((tag: string[]) => {
                    const type: string = tag[2] || 'media';
                    const val = tag[1];

                    if (media.has(type)) {
                        media.get(type)?.push(val);
                    } else {
                        media.set(type, [val]);
                    }
                });
                track.media = media;

                await db.tracks.put(track);
            } catch (e) {
                console.error(e);
            }
        });

        if (userId) {
            return liveQuery(() =>
                browser ? db.tracks.where({ authors: [userId] }).toArray() : []
            );
        } else {
            return liveQuery(() => (browser ? db.tracks.toArray() : []));
        }
    }
};

export default TrackInterface;
