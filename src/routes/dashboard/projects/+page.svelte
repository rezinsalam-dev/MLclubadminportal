<script>
	import { projects, projectsApi } from '$lib/stores/data.js';
	import ProjectForm from '$lib/components/ProjectForm.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let showForm = false;
	let editingProject = null;
	let deletingProject = null;

	function openAdd() {
		editingProject = null;
		showForm = true;
	}
	function openEdit(project) {
		editingProject = project;
		showForm = true;
	}
	function handleSave(e) {
		if (editingProject) {
			projectsApi.update(editingProject.id, e.detail);
		} else {
			projectsApi.add(e.detail);
		}
		showForm = false;
	}
	function confirmDelete() {
		projectsApi.remove(deletingProject.id);
		deletingProject = null;
	}
</script>

<svelte:head><title>Projects · Admin Portal</title></svelte:head>

<div class="animate-fadein space-y-5">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h2 class="font-display text-xl font-semibold text-ink">Project Management</h2>
			<p class="text-sm text-ink-muted mt-0.5">{$projects.length} projects showcased on the site</p>
		</div>
		<button class="btn-primary" on:click={openAdd}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
			Add project
		</button>
	</div>

	{#if $projects.length}
		<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
			{#each $projects as project (project.id)}
				<div class="card p-5 flex flex-col animate-popin">
					<div class="flex items-start justify-between gap-2">
						<h3 class="font-display font-semibold text-ink">{project.title}</h3>
						<div class="flex gap-1 shrink-0">
							<button class="btn-ghost !px-2 !py-1.5" on:click={() => openEdit(project)} aria-label="Edit {project.title}">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
							</button>
							<button class="btn-ghost !px-2 !py-1.5 hover:!text-danger" on:click={() => (deletingProject = project)} aria-label="Delete {project.title}">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
							</button>
						</div>
					</div>
					<p class="text-sm text-ink-muted mt-2 leading-relaxed flex-1">{project.description}</p>
					<div class="flex flex-wrap gap-1.5 mt-4">
						{#each project.tech as tech}
							<span class="chip">{tech}</span>
						{/each}
					</div>
					{#if project.github}
						<a href={project.github} target="_blank" rel="noreferrer" class="btn-outline w-full justify-center mt-4 !py-2">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
							View on GitHub
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="card p-12 text-center">
			<p class="text-ink-muted text-sm">No projects yet. Add the first one to feature it on the public site.</p>
		</div>
	{/if}
</div>

{#if showForm}
	<ProjectForm project={editingProject} on:close={() => (showForm = false)} on:save={handleSave} />
{/if}

{#if deletingProject}
	<ConfirmDialog
		title="Delete project"
		message={`Remove "${deletingProject.title}" from the public projects page?`}
		on:cancel={() => (deletingProject = null)}
		on:confirm={confirmDelete}
	/>
{/if}
