<script>
	import Modal from './Modal.svelte';
	import { createEventDispatcher } from 'svelte';

	export let post = null;

	const dispatch = createEventDispatcher();
	const isEdit = !!post;

	let form = {
		title: post?.title ?? '',
		author: post?.author ?? '',
		date: post?.date ?? new Date().toISOString().slice(0, 10),
		content: post?.content ?? ''
	};

	let errors = {};

	function validate() {
		errors = {};
		if (!form.title.trim()) errors.title = 'Title is required.';
		if (!form.author.trim()) errors.author = 'Author is required.';
		if (!form.content.trim()) errors.content = 'Content cannot be empty.';
		return Object.keys(errors).length === 0;
	}

	function submit() {
		if (!validate()) return;
		dispatch('save', { ...form });
	}
</script>

<Modal title={isEdit ? 'Edit Blog Post' : 'Write New Post'} wide on:close={() => dispatch('close')}>
	<form class="space-y-4" on:submit|preventDefault={submit}>
		<div>
			<label class="label" for="title">Title</label>
			<input id="title" class="field" bind:value={form.title} placeholder="Post title" />
			{#if errors.title}<p class="text-xs text-danger mt-1">{errors.title}</p>{/if}
		</div>

		<div class="grid grid-cols-2 gap-4">
			<div>
				<label class="label" for="author">Author</label>
				<input id="author" class="field" bind:value={form.author} placeholder="Author name" />
				{#if errors.author}<p class="text-xs text-danger mt-1">{errors.author}</p>{/if}
			</div>
			<div>
				<label class="label" for="date">Date</label>
				<input id="date" type="date" class="field" bind:value={form.date} />
			</div>
		</div>

		<div>
			<label class="label" for="content">Content</label>
			<textarea id="content" class="field min-h-[220px] resize-y font-body leading-relaxed" bind:value={form.content} placeholder="Write the post..." />
			{#if errors.content}<p class="text-xs text-danger mt-1">{errors.content}</p>{/if}
			<p class="text-[11px] text-ink-faint mt-1">{form.content.length} characters</p>
		</div>

		<div class="flex justify-end gap-2 pt-2">
			<button type="button" class="btn-ghost" on:click={() => dispatch('close')}>Cancel</button>
			<button type="submit" class="btn-primary">{isEdit ? 'Save changes' : 'Publish post'}</button>
		</div>
	</form>
</Modal>
