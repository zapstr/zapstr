<script lang="ts">
    import { currentUser } from '$lib/stores/currentUser';
    import ProfileSidebar from '$lib/components/ProfileSidebar.svelte';
    import TrackInterface from '$lib/interfaces/tracks';
    import TracksList from '$lib/components/TracksList.svelte';
    import ndk from '$lib/stores/ndk';
    import { onMount } from 'svelte';
    import Chat from '$lib/components/Chat.svelte';

    const tracks = TrackInterface.trackFrom();
    let _tracks: App.Track[] = [];

    $: _tracks = ($tracks || []) as App.Track[];
</script>

<div class="flex flex-row">
    <div class="w-2/12 h-screen border-r border-r-white/10 pt-24 px-8">
        {#if $currentUser}
            <ProfileSidebar
                userProfile={{ id: $currentUser.hexpubkey() }}
                npub={$currentUser.npub}
            />
        {:else}
            Need to login, bro
        {/if}
    </div>

    <div class="w-6/12 flex flex-col gap-8 pt-24 px-8">
        <h1 class="text-4xl text-white font-semibold mb-4 whitespace-nowrap">Listen</h1>

        <TracksList tracks={_tracks} />
    </div>

    <div class="w-4/12 border-l border-l-white/10 pt-24 px-8">
        <Chat />
    </div>
</div>
