<script>
	import { blogs, blogsApi } from '$lib/stores/data.js';
	import BlogForm from '$lib/components/BlogForm.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let showForm = false;
	let editingPost = null;
	let deletingPost = null;

	function openAdd() {
		editingPost = null;
		showForm = true;
	}
	function openEdit(post) {
		editingPost = post;
		showForm = true;
	}
	function handleSave(e) {
		if (editingPost) {
			blogsApi.update(editingPost.id, e.detail);
		} else {
			blogsApi.add(e.detail);
		}
		showForm = false;
	}
	function confirmDelete() {
		blogsApi.remove(deletingPost.id);
		deletingPost = null;
	}

	function formatDate(d) {
		return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<svelte:head><title>Blogs · Admin Portal</title></svelte:head>

<div class="animate-fadein space-y-5">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h2 class="font-display text-xl font-semibold text-ink">Blog Management</h2>
			<p class="text-sm text-ink-muted mt-0.5">{$blogs.length} posts published</p>
		</div>
		<button class="btn-primary" on:click={openAdd}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
			Write post
		</button>
	</div>

	<div class="card divide-y divide-border">
		{#each $blogs as post (post.id)}
			<div class="p-5 flex flex-col sm:flex-row sm:items-start gap-4 animate-popin">
				<div class="flex-1 min-w-0">
					<h3 class="font-display font-semibold text-ink">{post.title}</h3>
					<p class="text-xs text-ink-faint font-mono mt-1">{post.author} · {formatDate(post.date)}</p>
					<p class="text-sm text-ink-muted mt-2 line-clamp-2">{post.content}</p>
				</div>
				<div class="flex sm:flex-col gap-1.5 shrink-0">
					<button class="btn-outline !py-1.5" on:click={() => openEdit(post)}>Edit</button>
					<button class="btn-danger !py-1.5" on:click={() => (deletingPost = post)}>Delete</button>
				</div>
			</div>
		{:else}
			<div class="p-12 text-center text-ink-muted text-sm">No posts published yet.</div>
		{/each}
	</div>
</div>

{#if showForm}
	<BlogForm post={editingPost} on:close={() => (showForm = false)} on:save={handleSave} />
{/if}

{#if deletingPost}
	<ConfirmDialog
		title="Delete post"
		message={`Permanently delete "${deletingPost.title}"?`}
		on:cancel={() => (deletingPost = null)}
		on:confirm={confirmDelete}
	/>
{/if}
