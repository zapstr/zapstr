<script lang="ts">
	import { currentUser } from '$lib/stores/currentUser';
    import ProfileSidebar from '$lib/components/ProfileSidebar.svelte'
    import TrackInterface from '$lib/interfaces/tracks';
	import TracksList from '$lib/components/TracksList.svelte';
    import ndk from '$lib/stores/ndk';
	import { onMount } from 'svelte';

    const tracks = TrackInterface.trackFrom();
    let _tracks: App.Track[] = [];

    $: _tracks = ($tracks||[]) as App.Track[];
</script>

<div class="flex flex-col lg:flex-row gap-12">
    <div class="w-1/5">
        {#if $currentUser}
            <ProfileSidebar userProfile={{id: $currentUser.hexpubkey()}} npub={$currentUser.npub} />
        {:else}
            Need to login, bro
        {/if}
    </div>

    <div class="w-3/5 px-8 lg:px-0 flex flex-col gap-8">
        <h1 class="text-4xl text-white font-semibold mb-4 whitespace-nowrap">
            Listen
        </h1>

        <TracksList tracks={_tracks} />
    </div>

    <div class="w-1/5"></div>
</div>

