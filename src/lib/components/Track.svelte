<script lang="ts">
    import Name from '$lib/components/Name.svelte';
    import Cover from '$lib/components/Cover.svelte';
    import { player } from '$lib/stores/player';
    import { addToPlaylist } from '$lib/stores/addToPlaylist';
    import ZapIcon from '$lib/elements/icons/Zap.svelte';
    import PlayIcon from '$lib/elements/icons/Play.svelte';
    import { MenuButton, Dropdown, DropdownItem } from 'flowbite-svelte'

    export let track: App.Track;
    import ZapInterface from '$lib/interfaces/zaps';
    import ListenEventsInterface from '$lib/interfaces/listens';

    const zaps = ZapInterface.zapsFor({ eventId: track.id });
    const listenEvents = ListenEventsInterface.listenedTo({ trackId: track.id });
    let _zaps: App.Zap[] = [];
    let totalZapped = 0;
    let _listenEvents: App.ListenedEvent[] = [];
    let totalListened = 0;
    let isActive = $player?.track?.id === track?.id;
    let dropdownOpen = false;

    $: {
        // aggregate zap amounts
        _zaps = ($zaps || []) as App.Zap[];
        totalZapped = _zaps.reduce((acc, zap) => {
            return acc + zap.amount;
        }, 0);
    }

    $: {
        // count listens
        _listenEvents = ($listenEvents || []) as App.ListenedEvent[];
        totalListened = _listenEvents.length;
    }

    $: {
        isActive = $player?.track?.id === track?.id;
    }

    function play() {
        $player.track = track;
    }
</script>

<button
    class="
        flex flex-row items-center justify-center gap-6
        p-4 rounded-lg
        hover:bg-slate-900/70
        {isActive ? 'text-orange-500' : 'text-white'}
    "
    on:click|preventDefault={play}
>
    <div class="w-16 h-16 rounded">
        <Cover coverImage={track?.cover} />
    </div>

    <div class="flex flex-col items-start flex-grow">
        <div
            class="
            {isActive ? 'text-xl' : 'text-lg'}
            font-normal mb-1
        "
        >
            {track.name}
        </div>

        {#each track.authors as author}
            <div class="text-sm font-normal text-gray-400">
                <Name userId={author} />
            </div>
        {/each}
    </div>

    <div class="flex flex-row items-center">
        <PlayIcon />

        <div class="text-sm font-normal text-gray-400 ml-2 w-5">
            {totalListened}
        </div>
    </div>

    <div class="flex flex-row items-center">
        <ZapIcon />

        <div class="text-sm font-normal text-gray-400 ml-2 w-5">
            {totalZapped}
        </div>
    </div>


    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={(e) => { e.stopPropagation() }}>
        <MenuButton class="dots-menu dark:text-white" vertical />
        <Dropdown bind:open={dropdownOpen}>
            <DropdownItem on:click={(e) => { dropdownOpen = false; $addToPlaylist = track;}}>
                Add to Playlist
            </DropdownItem>
        </Dropdown>
    </div>
</button>
