<script lang="ts">
    import EventDebugger from '$lib/components/EventDebugger.svelte';
    import Navbar from '$lib/components/Navbar.svelte';
    import Player from '$lib/components/Player.svelte';
    import SubmitTrackModal from '$lib/components/modals/SubmitTrack.svelte';
    import LeftSidebar from '$lib/components/LeftSidebar.svelte';
    import Modals from '$lib/modals/index.svelte';
    import UserInterface from '$lib/interfaces/users';
    import '../app.css';

    import { currentUser, displayUserProfile } from '$lib/stores/currentUser';

    import ndk from '$lib/stores/ndk';
    import { NDKNip07Signer } from '@nostr-dev-kit/ndk';
    import { onMount } from 'svelte';

    let showSubmitTrack = false;

    let bannerImage: string | undefined;
    const defaultBannerImage =
        'https://nostr.build/i/nostr.build_e76387d298587c61e40913929eafe746ce6a780938750d21913a7b488228a146.webp';

    onMount(async () => {
        await signIn();
    });

    async function signIn() {
        // TODO: should have support for other signers, at least NIP-46
        let signer;

        try {
            signer = new NDKNip07Signer();
        } catch (e) {}

        if (!signer) return;

        $ndk.signer = signer;
        const pubkey = await signer.user();

        if (pubkey) {
            $currentUser = pubkey;
        }

        await $ndk.connect();
    }

    $: {
        bannerImage = $displayUserProfile?.banner || defaultBannerImage;
    }

    function submitTrack() {
        showSubmitTrack = !showSubmitTrack;
    }
</script>

{#if showSubmitTrack}
    <SubmitTrackModal on:close={submitTrack} />
{/if}

<div class="relative w-full h-64">
    <div class="bg-black/50 border-b border-black backdrop-blur-xl fixed w-full z-30">
        <Navbar on:submitTrack={submitTrack} on:signIn={signIn} />
    </div>
    <div
        class="absolute inset-0 w-full h-full bg-center bg-cover z-0"
        style={`background-image: url(${bannerImage})`}
    />
    <div
        class="absolute py-6 inset-0 w-full h-full bg-gradient-to-b from-transparent to-black z-1"
    />

    <div class="absolute w-full z-2">
        <div class="flex flex-row">
            <LeftSidebar />
            <slot />
        </div>
    </div>
</div>

<Modals />

<Player />

<EventDebugger />
