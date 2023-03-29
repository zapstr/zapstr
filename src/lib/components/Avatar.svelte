<script lang="ts">
    import UserInterface from '$lib/interfaces/users';

    export let userProfile: App.UserProfile;
    export let klass: string | undefined;

    let _userProfile = userProfile;
    let image: string | undefined;
    let defaultImage = `https://robohash.org/${userProfile.id?.slice(0, 2)}`;

    let observeUserProfile;

    if (!_userProfile?.image) {
        observeUserProfile = UserInterface.get({ hexpubkey: _userProfile.id });
    }

    $: {
        _userProfile = $observeUserProfile! as App.UserProfile;
        image = _userProfile?.image;
    }
</script>

<img src={image || defaultImage} alt="User avatar" class="w-32 h-32 {klass || ''} rounded-full" />
