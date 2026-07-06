<script>
	import { fade, scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let title = '';
	export let wide = false;

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	function onKeydown(e) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window on:keydown={onKeydown} />

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
	transition:fade={{ duration: 150 }}
	on:click={close}
	on:keydown={onKeydown}
	role="button"
	tabindex="-1"
	aria-label="Close dialog overlay"
>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div
		class="card w-full {wide ? 'max-w-2xl' : 'max-w-md'} p-6 animate-popin"
		on:click|stopPropagation
		on:keydown|stopPropagation
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div class="flex items-center justify-between mb-5">
			<h2 id="modal-title" class="font-display text-lg font-semibold text-ink">{title}</h2>
			<button
				class="text-ink-muted hover:text-ink rounded-md p-1 hover:bg-surface-raised transition-colors"
				on:click={close}
				aria-label="Close dialog"
			>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
			</button>
		</div>
		<slot />
	</div>
</div>
