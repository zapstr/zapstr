<script lang="ts">
    import UserInterface from '$lib/interfaces/users';
    import Avatar from '$lib/components/Avatar.svelte';
    import Name from '$lib/components/Name.svelte';
    import VerifiedCheckIcon from '$lib/elements/icons/VerifiedCheck.svelte';
    import { currentUser, displayUserProfile } from '$lib/stores/currentUser';

    let _userProfile;
    let observeUserProfile;

    if ($currentUser) {
        observeUserProfile = UserInterface.get({ hexpubkey: $currentUser.hexpubkey() });
    }

    $: {
        _userProfile = $observeUserProfile! as App.UserProfile;
        $displayUserProfile = _userProfile;
    }
</script>

<div class="flex flex-col gap-2 items-start w-fit">
    {#if $currentUser}
        <div class="w-12 lg:w-32">
            <Avatar
                userProfile={{ id: $currentUser.hexpubkey() }}
                klass="
                    w-12 h-12 lg:w-32 lg:h-32
                    border-4 border-slate-200
                "
            />
        </div>
        <div class="verifiedName flex flex-row gap-2">
            <Name
                userProfile={{ id: $currentUser.hexpubkey() }}
                klass="font-bold text-white text-2xl"
            />
            <!-- TODO: Properly check verification -->
            <VerifiedCheckIcon />
        </div>

        <div class="hidden lg:block">
            <span class="text-regular text-gray-500 whitespace-pre-line">
                {$displayUserProfile?.about || ''}
            </span>
        </div>
    {:else}{/if}
</div>
