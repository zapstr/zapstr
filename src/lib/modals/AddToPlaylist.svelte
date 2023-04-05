<script lang="ts">
    import { addToPlaylist } from '$lib/stores/addToPlaylist';
	import { currentUser } from '$lib/stores/currentUser';

    import ndkStore from '$lib/stores/ndk';
    import { debugEvent } from '$lib/stores/debugger';

    import MusicNote from '$lib/elements/icons/MusicNote.svelte';
    import { Modal } from 'flowbite-svelte'

    import { NDKEvent } from '@nostr-dev-kit/ndk';
    import { onMount } from 'svelte';
    import { ZapstrKind } from '$lib/types';

    import PlaylistInterface from '$lib/interfaces/playlists';

    const playlists = PlaylistInterface.from([$currentUser?.hexpubkey()])
    let _playlists: App.Playlist[] = [];

    $: _playlists = ($playlists || []) as App.Playlist[];

    let showNewPlaylist = false;
    let playlistName = '';

    let event = new NDKEvent($ndkStore);

    onMount(async () => {
        $debugEvent = event;
    });

    async function newPlaylistClicked() {
        if (!showNewPlaylist) {
            event = new NDKEvent($ndkStore);
            showNewPlaylist = true;
            event.kind = ZapstrKind.Playlist;
            return;
        }

        event.tags.push(['subject', playlistName]);

        await event.sign();
        $debugEvent = event;
        await event.publish();
    }

    async function toggleTrackInPlaylist(playlist: App.Playlist) {
        const trackEvent = new NDKEvent($ndkStore, JSON.parse($addToPlaylist!.event));
        const trackTag = trackEvent.tagReference();
        const playlistEvent = new NDKEvent($ndkStore, JSON.parse(playlist.event));
        playlistEvent.created_at = Math.floor(Date.now() / 1000);

        // Check if the tag is already there
        if (!playlistEvent.tags.find((tag) => tag[0] === trackTag[0] && tag[1] === trackTag[1])) {
            playlistEvent.tags.push(trackTag);
        } else {
            // Remove it
            playlistEvent.tags = playlistEvent.tags.filter((tag) => tag[0] !== trackTag[0] || tag[1] !== trackTag[1]);
        }

        await playlistEvent.sign();
        $debugEvent = playlistEvent;
        await playlistEvent.publish();

        await PlaylistInterface.add(playlistEvent);
    }

    function playlistIncludesTrack(playlist): boolean {
        const trackEvent = new NDKEvent($ndkStore, JSON.parse($addToPlaylist!.event));
        const trackTag = trackEvent.tagReference();
        const playlistEvent = new NDKEvent($ndkStore, JSON.parse(playlist.event));

        return !!playlistEvent.tags.find((tag) => tag[0] === trackTag[0] && tag[1] === trackTag[1]);
    }

    $: {
        $debugEvent = event;
    }
</script>

<div class="bg-gray-950">
<Modal
    title=""
    on:close={() => $addToPlaylist = undefined}
    autoclose
    open={!!$addToPlaylist}
    color="dark"
    class="
        bg-gray-900
        text-xl
    "
>
    <h3>
        Add to playlist
    </h3>

    <ul class="flex flex-col gap-4">
        {#each _playlists as playlist}
            <button
                class="text-white flex flex-row items-center gap-3"
                on:click|stopPropagation={() => toggleTrackInPlaylist(playlist)}
            >
                <MusicNote />
                <div class="text-white font-semibold text-base">{playlist.name}</div>

                {#if playlistIncludesTrack(playlist)}
                    ✅
                {/if}
            </button>
        {/each}
    </ul>

    {#if showNewPlaylist}
        <div class="flex flex-col gap-2">
            <input
                type="text"
                bind:value={playlistName}
                id="trackName"
                class="
                border border-gray-600 rounded-lg p-2 bg-transparent
                text-white
                text-lg
            "
                placeholder="Playlist Name"
            />
        </div>
    {/if}

    <button class="
        w-full
        text-base
        rounded-lg
        bg-indigo-600
        text-white
        tracking-wider
        py-4
        px-12
        font-semibold
    "
        on:click|stopPropagation={newPlaylistClicked}
    >
        New Playlist
    </button>
</Modal>
</div>