<script lang="ts">
    import { page } from '$app/stores';

    export let href: string;
    export let klass: string | undefined;
    export let activeKlass: string | undefined;

    let currentClass = klass || '';

    $: {
        if ($page.url.pathname === href) {
            currentClass = activeKlass || '';
        } else {
            currentClass = klass || '';
        }
    }
</script>

<a {href} class={`flex flex-row items-center gap-2 ${currentClass}`}>
    <slot />
</a>
