<script lang="ts">
    import { currentUser } from '$lib/stores/currentUser';
    import { goto } from '$app/navigation';

    $: {
        if ($currentUser) {
            goto(`/${$currentUser.npub}/listen`);
        }
    }
</script>
