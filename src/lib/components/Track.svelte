<script lang="ts">
    import Name from '$lib/components/Name.svelte';
    import Cover from '$lib/components/Cover.svelte';
    import {player} from '$lib/stores/player';
    import ZapIcon from '$lib/elements/icons/Zap.svelte';
    import PlayIcon from '$lib/elements/icons/play.svelte';

    export let track: App.Track;
    import ZapInterface from '$lib/interfaces/zaps';
    import ListenEventsInterface from '$lib/interfaces/listens';

    const zaps = ZapInterface.zapsFor({eventId: track.id});
    const listenEvents = ListenEventsInterface.listenedTo({trackId: track.id});
    let _zaps: App.Zap[] = [];
    let totalZapped = 0;
    let _listenEvents: App.ListenedEvent[] = [];
    let totalListened = 0;

    $: {
        // aggregate zap amounts
        _zaps = ($zaps||[]) as App.Zap[];
        totalZapped = _zaps.reduce((acc, zap) => {
            return acc + zap.amount;
        }, 0);
    }

    $: {
        // count listens
        _listenEvents = ($listenEvents||[]) as App.ListenedEvent[];
        totalListened = _listenEvents.length;
        console.log({totalListened});

    }

    function play() {
        $player.track = track;
    }
</script>

<a class="flex flex-row gap-6" href="#" on:click|preventDefault={play}>
    <div class="w-20 h-20 rounded">
        <Cover coverImage={track?.cover} />
    </div>

    <div class="flex flex-col flex-grow">
        <div class="text-lg font-normal mb-1">{track.name}</div>

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
</a>