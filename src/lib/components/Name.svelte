<script lang="ts">
	import type { UserProfile } from '$lib/interfaces/users';
	import UserInterface from '$lib/interfaces/users';

	export let userProfile: UserProfile | undefined = undefined;
	export let userId: string | undefined = undefined;
	export let klass: string | undefined = undefined;

	let _userProfile = userProfile;
	let name = '';
	const hexpubkey = userProfile?.id || userId;

	const defaultName = `[${hexpubkey!.slice(0, 8)}]`;
	let observeUserProfile;

	if (!_userProfile?.displayName && !userId) {
		observeUserProfile = UserInterface.get({ hexpubkey: _userProfile.id });
	} else if (!_userProfile && userId) {
		observeUserProfile = UserInterface.get({ hexpubkey: userId });
	}

	$: {
		_userProfile = $observeUserProfile! as UserProfile;
		name = _userProfile?.displayName || defaultName;
	}
</script>

<span class={klass || ''}>
	{name || defaultName}
</span>
