<script lang="ts">
    import type { UserProfile } from '$lib/interfaces/users';
    export let userProfile: UserProfile;
    import TrackInterface from '$lib/interfaces/tracks';
    import TracksList from './TracksList.svelte';

    const tracks = TrackInterface.trackFrom(userProfile.id!);
    let _tracks: App.Track[] = [];

    $: _tracks = ($tracks || []) as App.Track[];
</script>

<h1 class="text-4xl text-white font-semibold mb-4 whitespace-nowrap">Uploaded Tracks</h1>

<TracksList tracks={_tracks} />
