<script>
	import Modal from './Modal.svelte';
	import { createEventDispatcher } from 'svelte';

	export let project = null;

	const dispatch = createEventDispatcher();
	const isEdit = !!project;

	let form = {
		title: project?.title ?? '',
		description: project?.description ?? '',
		techInput: project?.tech?.join(', ') ?? '',
		github: project?.github ?? ''
	};

	let errors = {};

	function validate() {
		errors = {};
		if (!form.title.trim()) errors.title = 'Title is required.';
		if (!form.description.trim()) errors.description = 'Description is required.';
		return Object.keys(errors).length === 0;
	}

	function submit() {
		if (!validate()) return;
		dispatch('save', {
			title: form.title,
			description: form.description,
			github: form.github,
			tech: form.techInput.split(',').map((t) => t.trim()).filter(Boolean)
		});
	}
</script>

<Modal title={isEdit ? 'Edit Project' : 'Add Project'} on:close={() => dispatch('close')}>
	<form class="space-y-4" on:submit|preventDefault={submit}>
		<div>
			<label class="label" for="title">Title</label>
			<input id="title" class="field" bind:value={form.title} placeholder="e.g. CropSense" />
			{#if errors.title}<p class="text-xs text-danger mt-1">{errors.title}</p>{/if}
		</div>

		<div>
			<label class="label" for="description">Description</label>
			<textarea id="description" class="field min-h-[100px] resize-y" bind:value={form.description} placeholder="What does this project do?" />
			{#if errors.description}<p class="text-xs text-danger mt-1">{errors.description}</p>{/if}
		</div>

		<div>
			<label class="label" for="tech">Technologies (comma separated)</label>
			<input id="tech" class="field" bind:value={form.techInput} placeholder="PyTorch, FastAPI, Svelte" />
		</div>

		<div>
			<label class="label" for="github">GitHub link</label>
			<input id="github" class="field" bind:value={form.github} placeholder="https://github.com/..." />
		</div>

		<div class="flex justify-end gap-2 pt-2">
			<button type="button" class="btn-ghost" on:click={() => dispatch('close')}>Cancel</button>
			<button type="submit" class="btn-primary">{isEdit ? 'Save changes' : 'Add project'}</button>
		</div>
	</form>
</Modal>
