<script lang="ts">
    import {NDKEvent} from 'ndk';

    import EventDebugger from '$lib/components/EventDebugger.svelte';
	import { onMount } from 'svelte';
    import ndkStore from '$lib/stores/ndk';

    let genre: string | undefined;
    let url: string | undefined;
    let coverImage: string | undefined;
    let event = new NDKEvent();
    let subject = "";
    event.kind = 31337;

    onMount(() => {
        event.ndk = $ndkStore;
    })

    async function addTrack() {
        await event.sign();
        event = event;
        await $ndkStore.publish(event);
    }

    $: {
        event.tags = [];
        event.ndk = $ndkStore;

        // genres
        if (genre) {
            event.tags.push(["c", genre])
        }

        if (url) {
            event.tags.push(["media", url, "http"])
        }

        if (coverImage) {
            event.tags.push(["cover", coverImage])
        }

        if (subject) {
            event.tags.push(["subject", subject]);
        }

        event.toString().then((e) => {
            console.log(e);
        });

    }
</script>

<div class="w-screen h-screen bg-gray-900 z-5 fixed flex flex-col items-center justify-center text-white z-20">
    <div class="max-w-prose flex flex-col gap-4">
        <div class="flex flex-col gap-2">
            <div class="text-lg font-bold">Cover Image</div>
            <input type="text" class="
                border-2 border-gray-600 rounded-lg p-2 bg-transparent
                text-lg
            " placeholder="https://" bind:value={coverImage}>
            {#if coverImage}
                <img src={coverImage} class="w-32 h-auto rounded-lg" />
            {/if}
        </div>

        <div class="flex flex-col gap-2">
            <div class="text-lg font-bold">Track Name</div>
            <input type="text" class="
                border-2 border-gray-600 rounded-lg p-2 bg-transparent
                text-lg
            " placeholder="Track Name" bind:value={subject}>
        </div>


        <div class="flex flex-col gap-2">
            <div class="text-lg font-bold">Genre</div>
            <select class="
                border-2 border-gray-600 rounded-lg p-2 bg-transparent
                text-lg
            " bind:value={genre}>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="R&B">R&B</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Jazz">Jazz</option>
                <option value="Classical">Classical</option>
                <option value="Folk">Folk</option>
                <option value="Indie">Indie</option>
                <option value="Other">Other</option>
            </select>
        </div>

        <div class="flex flex-col gap-2">
            <div class="text-lg font-bold">URL</div>
            <input type="text" class="
                border-2 border-gray-600 rounded-lg p-2 bg-transparent
                text-lg
            " placeholder="https://" bind:value={url}>
        </div>

        <button class="
            font-bold
            text-white
            bg-purple-800
            rounded-xl
            w-full
            py-4
            mt-4
        " on:click={addTrack}>Add Track</button>
    </div>
</div>

<EventDebugger {event} />