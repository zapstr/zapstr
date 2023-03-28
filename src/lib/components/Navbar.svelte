<script lang="ts">
	import { goto } from '$app/navigation';
    import Logo from '$lib/elements/icons/Logo.svelte';

    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function submitTrack() {
        dispatch("submitTrack");
    }
</script>

<div class="
    flex flex-row
    p-4
">
    <button on:click={() => { goto('/') }}>
        <Logo />
    </button>

    <div class="flex-grow"></div>
    <button class="
        bg-purple-500
        rounded-full
        font-bold
        px-6 py-2
        text-white
    " on:click={submitTrack}>
        Submit Track
    </button>
</div>