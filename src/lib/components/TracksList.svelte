<script lang="ts">
    import TrackRow from '$lib/components/Track.svelte';

    export let tracks: App.Track[];
</script>

<div class="flex flex-col">
    {#each tracks as track}
        <TrackRow {track} />
    {/each}
</div>