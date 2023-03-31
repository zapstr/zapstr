<script lang="ts">
    import type { UserProfile } from '$lib/interfaces/users';
    export let userProfile: UserProfile;
    import TrackInterface from '$lib/interfaces/tracks';
    import TracksList from './TracksList.svelte';

    const tracks = TrackInterface.trackFrom(userProfile.id!);
    let _tracks: App.Track[] = [];

    $: _tracks = ($tracks || []) as App.Track[];
</script>

<TracksList tracks={_tracks} />
