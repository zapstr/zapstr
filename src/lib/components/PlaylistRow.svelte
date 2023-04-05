<script lang="ts">
    import Name from '$lib/components/Name.svelte';
    import Cover from '$lib/components/Cover.svelte';

    export let playlist: App.Playlist;

    let isActive = false;
</script>

<button
    class="
        flex flex-row items-center justify-center gap-6
        p-4 rounded-lg
        hover:bg-slate-900/70
        {isActive ? 'text-orange-500' : 'text-white'}
    "
>
    <div class="w-16 h-16 rounded">
        <Cover coverImage={playlist?.image} />
    </div>

    <div class="flex flex-col items-start flex-grow">
        <div
            class="
            {isActive ? 'text-xl' : 'text-lg'}
            font-normal mb-1
        "
        >
            {playlist.name}
        </div>

        <!-- <div class="text-sm font-normal text-gray-400">
            <Name userId={author} />
        </div> -->
    </div>

    <!-- <div class="flex flex-row items-center">
        <PlayIcon />

        <div class="text-sm font-normal text-gray-400 ml-2 w-5">
            {totalListened}
        </div>
    </div> -->

    <!-- <div class="flex flex-row items-center">
        <ZapIcon />

        <div class="text-sm font-normal text-gray-400 ml-2 w-5">
            {totalZapped}
        </div>
    </div> -->
</button>
