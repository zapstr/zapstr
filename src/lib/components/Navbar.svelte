<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/elements/icons/Logo.svelte';
	import PlusCircle from '$lib/elements/icons/PlusCircle.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function submitTrack() {
		dispatch('submitTrack');
	}
</script>

<div
	class="
    flex flex-row
    p-4 items-center
"
>
	<button
		on:click={() => {
			goto('/');
		}}
	>
		<Logo />
	</button>

	<button
		class="
        bg-button-purple
        rounded-full
        font-semibold
        px-4 py-1.5 h-fit
        text-white
		flex flex-row gap-2
		items-center
		ml-auto
    "
		on:click={submitTrack}
	>
		<PlusCircle />
		Submit Track
	</button>
</div>
