<script lang="ts">
    import { debugEvent } from '$lib/stores/debugger';
    import { NDKEvent } from '@nostr-dev-kit/ndk';

    import { onMount } from 'svelte';
    import ndkStore from '$lib/stores/ndk';
    import XIcon from '$lib/elements/icons/X.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('close');
        console.log('Close');
    }

    let genre: string | undefined;
    let url: string | undefined;
    let coverImage: string | undefined;
    let event = new NDKEvent();
    let subject = '';
    event.kind = 31337;

    onMount(async () => {
        event.ndk = $ndkStore;
    });

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
            event.tags.push(['c', genre]);
        }

        if (url) {
            event.tags.push(['media', url, 'http']);
        }

        if (coverImage) {
            event.tags.push(['cover', coverImage]);
        }

        if (subject) {
            event.tags.push(['subject', subject]);
        }

        $debugEvent = event;
    }
</script>

<div
    class="w-screen h-screen bg-gray-900 z-40 fixed flex flex-col items-center justify-center text-white"
>
    <button class="closeIcon absolute top-10 right-10 text-white" on:click={closeModal}
        ><XIcon /></button
    >
    <div class="w-96 mx-auto flex flex-col gap-4">
        <h2 class="prose-inverse text-3xl font-bold">Submit Track</h2>
        <div class="w-full flex flex-col gap-2">
            <label for="trackCover" class="text-lg font-semibold">Cover Image</label>
            <input
                type="text"
                id="trackCover"
                class="
                border border-gray-600 rounded-lg p-2 bg-transparent
                text-lg
            "
                placeholder="https://..."
                bind:value={coverImage}
            />
            {#if coverImage}
                <img src={coverImage} alt="Track cover" class="w-32 h-auto rounded-lg" />
            {/if}
        </div>

        <div class="flex flex-col gap-2">
            <label for="trackName" class="text-lg font-semibold">Track Name</label>
            <input
                type="text"
                id="trackName"
                class="
                border border-gray-600 rounded-lg p-2 bg-transparent
                text-lg
            "
                placeholder="Track Name"
                bind:value={subject}
            />
        </div>

        <div class="flex flex-col gap-2">
            <div class="text-lg font-semibold">Genre</div>
            <select
                class="
                border border-gray-600 rounded-lg p-2 bg-transparent
                text-lg
            "
                bind:value={genre}
            >
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
            <label for="url" class="text-lg font-semibold">URL</label>
            <input
                type="text"
                id="url"
                class="
                border border-gray-600 rounded-lg p-2 bg-transparent
                text-lg
            "
                placeholder="https://..."
                bind:value={url}
            />
        </div>

        <button
            class="
            font-semibold
            text-white
            bg-button-purple
            rounded-xl
            w-full
            py-3
            mt-4
        "
            on:click={addTrack}>Add Track</button
        >
    </div>
</div>
