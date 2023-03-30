<script lang="ts">
    import LeftSidebarProfile from '$lib/components/LeftSidebarProfile.svelte';
    import LeftSidebarNav from '$lib/components/LeftSidebarNav.svelte';
</script>

<div class="w-2/12 h-screen border-r border-r-white/10 pt-24 px-8">
    <div class="flex flex-col gap-4">
        <LeftSidebarProfile />
        <LeftSidebarNav />
    </div>
</div>
