<script lang="ts">
	import { debugEvent } from '$lib/stores/debugger';

	let display = false;
	let eventString: string;

	$: {
		$debugEvent?.toString().then((e: any) => {
			eventString = e;
		});
	}
</script>

{#if $debugEvent}
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a
		href="#"
		class="
        fixed bottom-0
        bg-black
        shadow-xl
        text-white
        font-mono
        z-40
        p-4
        flex flex-col items-center justify-center gap-10
        rounded-tr-xl
    "
		on:click={() => {
			display = !display;
		}}
	>
		<div class="max-w-3xl overflow-auto gap-2">
			<div class="flex flex-row items-center gap-2">
				<div class="font-bold text-lg">Event Debugger</div>

				<span class="text-sm text-gray-500">
					(kind {$debugEvent.kind})
				</span>
			</div>
			{#if display}
				<pre class="">{JSON.stringify(eventString, null, 4)}</pre>
			{/if}
		</div>
	</a>
{/if}
