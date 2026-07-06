<script>
	export let name = '';
	export let src = '';
	export let size = 40;

	$: initials = name
		.split(' ')
		.map((p) => p[0])
		.slice(0, 2)
		.join('')
		.toUpperCase();
</script>

{#if src}
	<img {src} alt={name} class="rounded-full object-cover shrink-0" style="width:{size}px;height:{size}px" />
{:else}
	<div
		class="rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-accent font-display font-medium shrink-0"
		style="width:{size}px;height:{size}px;font-size:{size * 0.38}px"
	>
		{initials || '?'}
	</div>
{/if}
