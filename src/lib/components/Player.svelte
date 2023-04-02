<script lang="ts">
    import Cover from '$lib/components/Cover.svelte';
    import ZapIcon from '$lib/elements/icons/Zap.svelte';
    import ZapStreamIcon from '$lib/elements/icons/ZapStream.svelte';
    import { requestProvider } from 'webln';

    import { NDKEvent } from '@nostr-dev-kit/ndk';
    import { player } from '$lib/stores/player';
    import { debugEvent } from '$lib/stores/debugger';
    import ndkStore from '$lib/stores/ndk';
    import { settings } from '$lib/stores/settings';
    import { slide } from 'svelte/transition';
    import PlayCircleIcon from '$lib/elements/icons/PlayCircle.svelte';
    import PauseCircleIcon from '$lib/elements/icons/PauseCircle.svelte';
    import Forward30Icon from '$lib/elements/icons/Forward30.svelte';
    import Back10Icon from '$lib/elements/icons/Back10.svelte';

    let http: string | undefined;

    $: http = ($player.track?.media?.get('http') || [])[0];

    async function publishListenEvent(track: App.Track) {
        let event = new NDKEvent();
        event.kind = 1338;
        event.ndk = $ndkStore;
        event.tags = [['e', track.id!]];
        track.authors.forEach((author) => {
            event.tags.push(['p', author]);
        });
        await event.sign();
        event = event;
        $debugEvent = event;
        $ndkStore.publish(event);
    }

    async function zap(amount = 10000) {
        const trackEvent: NDKEvent = await $ndkStore.fetchEvent({ ids: [$player.track!.id!] });

        if (!trackEvent) throw new Error('Track event not found');

        const pr = await trackEvent.zap(amount);

        try {
            const webln = await requestProvider();
            const res = await webln.sendPayment(pr);
            zappingMutex = false;
        } catch (err: any) {
            console.log(err);
            // should we unlock the mutex here if the user rejected the payment?
        }
    }

    function onPlay() {
        publishListenEvent($player.track);
    }

    let playing: boolean = true;

    function togglePlay() {
        let playerElement: HTMLAudioElement | null = document.getElementById(
            'player'
        ) as HTMLAudioElement;
        playing ? playerElement?.pause() : playerElement?.play();
        playing = !playing;
    }

    function rewind10() {
        let playerElement: HTMLAudioElement | null = document.getElementById(
            'player'
        ) as HTMLAudioElement;
        playerElement.currentTime -= 10.0;
    }

    function forward30() {
        let playerElement: HTMLAudioElement | null = document.getElementById(
            'player'
        ) as HTMLAudioElement;
        playerElement.currentTime += 30.0;
    }

    let zappingMutex = false; // make sure we don't send a new zap while the previous one is still pending
    let currentTime = 0;
    let totalLength = 0;
    let progress = 0;
    let lastZappedTime = 0; // XXX need to reset this when player track changes

    async function onTimeUpdate(event: Event) {
        let audio = event.target as HTMLAudioElement;
        currentTime = audio.currentTime;
        totalLength = audio.duration;

        if ($settings.streamingZapsEnabled) {
            if (currentTime - lastZappedTime > 10) {
                if (!zappingMutex) {
                    zappingMutex = true;
                    await zap();
                    lastZappedTime = currentTime;
                }
            }
        }

        if (totalLength > 0) progress = (currentTime / totalLength) * 100;
    }
</script>

{#if $player.track}
    <div
        transition:slide
        class="fixed bottom-0 w-full bg-black border-t border-white/10 flex flex-row items-center justify-around gap-8 px-8 py-4"
    >
        <div class="flex flex-row gap-4 text-lg">
            <div class="w-12 h-12 rounded-lg">
                <Cover coverImage={$player.track.cover} />
            </div>

            <div class="flex flex-col gap-2">
                <span class="font-semibold">{$player.track.name}</span>

                <div class="h-1 w-80 rounded bg-neutral-200 dark:bg-neutral-600">
                    <div class="h-1 bg-button-purple" style={`width: ${progress}%`} />
                </div>
            </div>
        </div>

        <div class="flex flex-row items-center gap-6">
            <button on:click={rewind10} class="hover:text-orange-500">
                <Back10Icon />
            </button>
            <button class="w-14 h-14 hover:text-orange-500" on:click={togglePlay}>
                {#if playing}
                    <PauseCircleIcon klass="w-14 h-14" />
                {:else}
                    <PlayCircleIcon klass="w-14 h-14" />
                {/if}
            </button>
            <button on:click={forward30} class="hover:text-orange-500">
                <Forward30Icon />
            </button>
        </div>

        <div class="flex flex-row items-center h-full">
            <button on:click={() => zap()}>
                <span><ZapIcon klass="w-8 h-8 text-white hover:text-orange-500" /></span>
            </button>
            <button
                class="ml-4"
                on:click={() => {
                    $settings.streamingZapsEnabled = !$settings.streamingZapsEnabled;
                }}
            >
                <ZapStreamIcon enabled={$settings.streamingZapsEnabled} />
            </button>

            {#if $settings.streamingZapsEnabled}
                <div class="text-white line-clamp-1 ml-4" transition:slide|local={{ axis: 'x' }}>
                    Streaming
                    <span class="text-orange-500">
                        {$settings.streamingZaps / 1000}k
                    </span>/min
                </div>
            {/if}
        </div>

        {#if http}
            <audio
                autoplay
                id="player"
                class="hidden"
                on:play={onPlay}
                on:timeupdate={onTimeUpdate}
            >
                <source src={http} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        {/if}
    </div>
{/if}
