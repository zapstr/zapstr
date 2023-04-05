<script lang="ts">
    import PlaylistRow from '$lib/components/PlaylistRow.svelte';

    export let playlists: App.Playlist[];
</script>

<div class="flex flex-col">
    {#each playlists as playlist}
        <PlaylistRow {playlist} />
    {/each}
</div>
