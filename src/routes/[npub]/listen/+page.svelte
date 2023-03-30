<script lang="ts">
    import TrackInterface from '$lib/interfaces/tracks';
    import TracksList from '$lib/components/TracksList.svelte';
    import Chat from '$lib/components/Chat.svelte';

    const tracks = TrackInterface.trackFrom();
    let _tracks: App.Track[] = [];

    $: _tracks = ($tracks || []) as App.Track[];
</script>

<div class="centerColumn">
    <h1>Listen</h1>
    <TracksList tracks={_tracks} />
</div>

<div class="rightColumn">
    <Chat />
</div>
