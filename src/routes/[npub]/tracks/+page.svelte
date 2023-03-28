<script lang="ts">
    import ProfileSidebar from '$lib/components/ProfileSidebar.svelte'
    import UploadedTracks from '$lib/components/UploadedTracks.svelte'
    import Chat from '$lib/components/Chat.svelte'

    import UserInterface from '$lib/interfaces/users';

    import { page } from '$app/stores';
    import {displayUserProfile} from '$lib/stores/currentUser';

    import {NDKUser} from 'ndk';

    let {npub} = $page.params;

    const ndkUser = new NDKUser({npub});
    const hexpubkey = ndkUser.hexpubkey();

    const userProfile = UserInterface.get({hexpubkey});
    let profile;

    $: {
        profile = $userProfile || {id: hexpubkey};
        $displayUserProfile = profile;
    }
</script>

<div class="flex flex-col lg:flex-row gap-12">
    <div class="w-1/5">
        <ProfileSidebar userProfile={$userProfile||{id: hexpubkey}} {npub} />
    </div>

    <div class="w-3/5 px-8 lg:px-0">
        <UploadedTracks userProfile={$userProfile||{id: hexpubkey}} />
    </div>

    <div class="w-1/5 opacity-10">
        <Chat />
    </div>
</div>