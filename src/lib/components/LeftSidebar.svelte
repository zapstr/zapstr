<script lang="ts">
    import LeftSidebarProfile from '$lib/components/LeftSidebarProfile.svelte';
    import LeftSidebarNav from '$lib/components/LeftSidebarNav.svelte';
    import { currentUser } from '$lib/stores/currentUser';

    export let userProfile: App.UserProfile;
    export let npub: string;
</script>

<div class="flex flex-col gap-4">
    {#if $currentUser}
        <LeftSidebarProfile {userProfile} />
    {/if}

    <LeftSidebarNav {npub} />
</div>
