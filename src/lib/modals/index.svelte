<script lang="ts">
    import { addToPlaylist } from '$lib/stores/addToPlaylist';

    import AddToPlaylist from "./AddToPlaylist.svelte";
</script>

{#if $addToPlaylist}
    <AddToPlaylist />
{/if}