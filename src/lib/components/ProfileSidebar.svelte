<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	import Name from '$lib/components/Name.svelte';
	import Link from './Link.svelte';
	import PlayIcon from '$lib/elements/icons/Play.svelte';

	export let userProfile: App.UserProfile;
	export let npub: string;
</script>

<div class="flex flex-row lg:flex-col gap-4 px-8">
	<div class="flex flex-row lg:flex-col gap-2 items-center w-fit">
		<div class="w-12 lg:w-32">
			<Avatar
				{userProfile}
				klass="
                w-12 h-12 lg:w-32 lg:h-32
                border-4 border-white
            "
			/>
		</div>
		<Name {userProfile} klass="font-semibold text-white text-lg hidden lg:block" />
		<div class="hidden lg:block">
			<span class="text-regular text-gray-500 whitespace-pre-line"
				>{userProfile?.about || ''}</span
			>
		</div>
	</div>

	<div class="flex flex-row lg:flex-col gap-6 font-semibold text-lg">
		<Link
			href={`/${npub}/listen`}
			klass="text-white whitespace-nowrap"
			activeKlass="text-violet-500"
		>
			<PlayIcon />

			<span class="whitespace-nowrap">Listen</span>
		</Link>

		<Link
			href={`/${npub}/playlists`}
			klass="text-white whitespace-nowrap"
			activeKlass="text-violet-500"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16.2779 2.80076C16.5517 2.90772 16.8743 3.06907 17.2259 3.24492L20.9472 5.10555C21.4412 5.35254 21.6414 5.95322 21.3944 6.4472C21.1474 6.94117 20.5468 7.1414 20.0528 6.89441L16.3683 5.05218C15.9675 4.85178 15.7281 4.73319 15.5502 4.66369L15.5215 4.65274L15.5184 4.68335C15.501 4.87355 15.5 5.14072 15.5 5.58884V18L15.5 18.0032C15.4983 20.2109 13.7081 22 11.5 22C9.29086 22 7.5 20.2091 7.5 18C7.5 15.7909 9.29086 14 11.5 14C12.2286 14 12.9117 14.1948 13.5 14.5351L13.5 5.54767C13.5 5.15455 13.4999 4.7938 13.5267 4.50105C13.5543 4.19955 13.6199 3.81652 13.8611 3.47173C14.1764 3.02093 14.6635 2.7199 15.2077 2.63949C15.6239 2.578 15.9959 2.69061 16.2779 2.80076Z"
					fill="white"
				/>
				<path
					d="M6.5 3C7.05228 3 7.5 3.44772 7.5 4V6H9.5C10.0523 6 10.5 6.44772 10.5 7C10.5 7.55228 10.0523 8 9.5 8H7.5V10C7.5 10.5523 7.05228 11 6.5 11C5.94772 11 5.5 10.5523 5.5 10V8H3.5C2.94772 8 2.5 7.55228 2.5 7C2.5 6.44772 2.94772 6 3.5 6H5.5V4C5.5 3.44772 5.94772 3 6.5 3Z"
					fill="white"
				/>
			</svg>

			<span class="whitespace-nowrap">My Playlists</span>
		</Link>

		<Link
			href={`/${npub}/tracks`}
			klass="text-white whitespace-nowrap"
			activeKlass="text-violet-500"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16.3788 22.0939C15.6165 22.4251 15.2353 22.5907 14.6333 22.4784C14.194 22.3965 13.593 22.0024 13.3428 21.632C13 21.1246 13 20.5677 13 19.4538V10.4142L15.2929 12.7071C15.6834 13.0976 16.3166 13.0976 16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L11 10.4142L10.9999 19.3446C10.9989 20.6056 10.9981 21.6012 11.734 22.642C11.8217 22.7659 11.9258 22.8858 12.0402 22.9999C12.0268 23 12.0134 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 16.5189 20.2751 20.4013 16.3788 22.0939Z"
					fill="white"
				/>
			</svg>

			<span class="whitespace-nowrap">Uploaded Tracks</span>
		</Link>
	</div>
</div>
