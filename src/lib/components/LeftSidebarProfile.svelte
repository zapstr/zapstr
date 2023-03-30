<script lang="ts">
    import Avatar from '$lib/components/Avatar.svelte';
    import Name from '$lib/components/Name.svelte';
    import VerifiedCheckIcon from '$lib/elements/icons/VerifiedCheck.svelte';

    export let userProfile: App.UserProfile;
</script>

<div class="flex flex-col gap-2 items-center w-fit">
    <div class="w-12 lg:w-32">
        <Avatar
            {userProfile}
            klass="
            w-12 h-12 lg:w-32 lg:h-32
            border-4 border-slate-200
        "
        />
    </div>
    <div class="verifiedName flex flex-row gap-2">
        <Name {userProfile} klass="font-bold text-white text-2xl" />
        <!-- TODO: Properly check verification -->
        <VerifiedCheckIcon />
    </div>

    <div class="hidden lg:block">
        <span class="text-regular text-gray-500 whitespace-pre-line"
            >{userProfile?.about || ''}</span
        >
    </div>
</div>
