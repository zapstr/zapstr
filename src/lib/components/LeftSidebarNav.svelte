<script lang="ts">
    import Link from './Link.svelte';
    import PlayIcon from '$lib/elements/icons/Play.svelte';
    import UploadIcon from '$lib/elements/icons/Upload.svelte';
    import MusicNoteIcon from '$lib/elements/icons/MusicNote.svelte';
    import { currentUser } from '$lib/stores/currentUser';
</script>

<div class="flex flex-col gap-4 mt-8 font-semibold text-lg">
    <Link
        href={`/${$currentUser?.npub}/listen`}
        klass="text-white whitespace-nowrap"
        activeKlass="text-violet-500"
    >
        <PlayIcon />

        <span class="whitespace-nowrap">Listen</span>
    </Link>

    <Link
        href={`/${$currentUser?.npub}/playlists`}
        klass="text-white whitespace-nowrap"
        activeKlass="text-violet-500"
    >
        <MusicNoteIcon />

        <span class="whitespace-nowrap">My Playlists</span>
    </Link>

    <Link
        href={`/${$currentUser?.npub}/tracks`}
        klass="text-white whitespace-nowrap"
        activeKlass="text-violet-500"
    >
        <UploadIcon />

        <span class="whitespace-nowrap">Uploaded Tracks</span>
    </Link>
</div>
