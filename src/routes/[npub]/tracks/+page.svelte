<script lang="ts">
    import UploadedTracks from '$lib/components/UploadedTracks.svelte';
    import Chat from '$lib/components/Chat.svelte';

    import UserInterface from '$lib/interfaces/users';

    import { page } from '$app/stores';
    import { displayUserProfile } from '$lib/stores/currentUser';

    import { NDKUser } from 'nostr-dev-kit';

    let { npub } = $page.params;

    const ndkUser = new NDKUser({ npub });
    const hexpubkey = ndkUser.hexpubkey();

    const userProfile = UserInterface.get({ hexpubkey });
    let profile;

    $: {
        profile = $userProfile || { id: hexpubkey };
        $displayUserProfile = profile;
    }
</script>

<div class="centerColumn">
    <h1>Uploaded Tracks</h1>
    <UploadedTracks userProfile={$userProfile || { id: hexpubkey }} />
</div>

<div class="rightColumn">
    <Chat />
</div>
