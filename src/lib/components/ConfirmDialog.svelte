<script>
	import Modal from './Modal.svelte';
	import { createEventDispatcher } from 'svelte';

	export let title = 'Delete item';
	export let message = 'This action cannot be undone.';

	const dispatch = createEventDispatcher();
</script>

<Modal title={title} on:close={() => dispatch('cancel')}>
	<p class="text-sm text-ink-muted leading-relaxed">{message}</p>
	<div class="mt-6 flex justify-end gap-2">
		<button class="btn-ghost" on:click={() => dispatch('cancel')}>Cancel</button>
		<button class="btn-danger" on:click={() => dispatch('confirm')}>Delete</button>
	</div>
</Modal>
