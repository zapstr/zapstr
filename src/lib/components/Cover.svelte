<script lang="ts">
	export let coverImage: string | undefined;
	export let klass: string | undefined = undefined;

	const defaultCover = `https://picsum.photos/200/200?${Math.random()}`;
</script>

<img src={coverImage || defaultCover} class="bg-slate-600 object-cover rounded-lg {klass || ''}" />
