<script lang="ts">
    import PlaylistInterface from '$lib/interfaces/playlists';
    import Playlists from '$lib/components/PlaylistList.svelte';
    import Chat from '$lib/components/Chat.svelte';
    import { page } from '$app/stores';
    import { NDKUser } from '@nostr-dev-kit/ndk';
    import PlaylistList from '$lib/components/PlaylistList.svelte';

    let { npub } = $page.params;

    const ndkUser = new NDKUser({ npub });
    const hexpubkey = ndkUser.hexpubkey();

    const playlists = PlaylistInterface.from([hexpubkey]);
    let _Playlists: App.Playlist[] = [];

    $: _Playlists = ($playlists || []) as App.Playlist[];
</script>

<div class="centerColumn">
    <h1>Playlists</h1>
    <Playlists playlists={_Playlists} />
</div>

<div class="rightColumn">
    <Chat />
</div>
