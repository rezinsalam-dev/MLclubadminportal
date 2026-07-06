<script>
	import Modal from './Modal.svelte';
	import { createEventDispatcher } from 'svelte';

	export let member = null; // null => add mode

	const dispatch = createEventDispatcher();
	const isEdit = !!member;

	let form = {
		name: member?.name ?? '',
		position: member?.position ?? '',
		type: member?.type ?? 'Core',
		photo: member?.photo ?? '',
		github: member?.github ?? '',
		linkedin: member?.linkedin ?? '',
		facebook: member?.facebook ?? ''
	};

	let errors = {};

	function validate() {
		errors = {};
		if (!form.name.trim()) errors.name = 'Name is required.';
		if (!form.position.trim()) errors.position = 'Position is required.';
		return Object.keys(errors).length === 0;
	}

	function submit() {
		if (!validate()) return;
		dispatch('save', { ...form });
	}
</script>

<Modal title={isEdit ? 'Edit Member' : 'Add Member'} on:close={() => dispatch('close')}>
	<form class="space-y-4" on:submit|preventDefault={submit}>
		<div>
			<label class="label" for="name">Full name</label>
			<input id="name" class="field" bind:value={form.name} placeholder="e.g. Ananya Roy" />
			{#if errors.name}<p class="text-xs text-danger mt-1">{errors.name}</p>{/if}
		</div>

		<div class="grid grid-cols-2 gap-4">
			<div>
				<label class="label" for="position">Position</label>
				<input id="position" class="field" bind:value={form.position} placeholder="e.g. Web Lead" />
				{#if errors.position}<p class="text-xs text-danger mt-1">{errors.position}</p>{/if}
			</div>
			<div>
				<label class="label" for="type">Type</label>
				<select id="type" class="field" bind:value={form.type}>
					<option>Core</option>
					<option>Core Alumnus</option>
				</select>
			</div>
		</div>

		<div>
			<label class="label" for="photo">Photo URL (optional)</label>
			<input id="photo" class="field" bind:value={form.photo} placeholder="https://..." />
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div>
				<label class="label" for="github">GitHub</label>
				<input id="github" class="field" bind:value={form.github} placeholder="https://github.com/..." />
			</div>
			<div>
				<label class="label" for="linkedin">LinkedIn</label>
				<input id="linkedin" class="field" bind:value={form.linkedin} placeholder="https://linkedin.com/in/..." />
			</div>
			<div>
				<label class="label" for="facebook">Facebook</label>
				<input id="facebook" class="field" bind:value={form.facebook} placeholder="https://facebook.com/..." />
			</div>
		</div>

		<div class="flex justify-end gap-2 pt-2">
			<button type="button" class="btn-ghost" on:click={() => dispatch('close')}>Cancel</button>
			<button type="submit" class="btn-primary">{isEdit ? 'Save changes' : 'Add member'}</button>
		</div>
	</form>
</Modal>
