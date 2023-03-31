<script lang="ts">
    import { goto } from '$app/navigation';
    import Logo from '$lib/elements/icons/Logo.svelte';
    import PlusCircle from '$lib/elements/icons/PlusCircle.svelte';
    import { currentUser, displayUserProfile } from '$lib/stores/currentUser';
    import { createEventDispatcher } from 'svelte';
    import Avatar from './Avatar.svelte';

    const dispatch = createEventDispatcher();

    function submitTrack() {
        dispatch('submitTrack');
    }
</script>

<div
    class="
    flex flex-row gap-4
    px-8 py-2 items-center
"
>
    <button
        on:click={() => {
            goto('/');
        }}
    >
        <Logo />
    </button>

    <div class="ml-auto flex flex-row gap-4 items-center">
        {#if $currentUser}
            <button
                class="
        bg-button-purple
        rounded-full
        font-semibold
        px-4 py-1.5 h-10
        text-white
		flex flex-row gap-2
		items-center
    "
                on:click={submitTrack}
            >
                <PlusCircle />
                Submit Track
            </button>
            <Avatar
                userProfile={{ id: $currentUser?.hexpubkey() }}
                klass="w-10 h-10 border-2 border-slate-200"
            />
        {:else}
            <button
                class="
            bg-button-purple
            rounded-full
            font-semibold
            px-4 py-1.5 h-10
            text-white
            flex flex-row gap-2
            items-center"
            >
                Sign in
            </button>
        {/if}
    </div>
</div>
