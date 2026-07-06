<script>
	import { members, membersApi } from '$lib/stores/data.js';
	import MemberForm from '$lib/components/MemberForm.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	let showForm = false;
	let editingMember = null;
	let deletingMember = null;
	let search = '';

	$: filtered = $members.filter((m) =>
		[m.name, m.position, m.type].join(' ').toLowerCase().includes(search.toLowerCase())
	);

	function openAdd() {
		editingMember = null;
		showForm = true;
	}
	function openEdit(member) {
		editingMember = member;
		showForm = true;
	}
	function handleSave(e) {
		if (editingMember) {
			membersApi.update(editingMember.id, e.detail);
		} else {
			membersApi.add(e.detail);
		}
		showForm = false;
	}
	function confirmDelete() {
		membersApi.remove(deletingMember.id);
		deletingMember = null;
	}

	const socialIcon = (type) => ({
		github: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
		linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z',
		facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z'
	}[type]);
</script>

<svelte:head><title>Members · Admin Portal</title></svelte:head>

<div class="animate-fadein space-y-5">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h2 class="font-display text-xl font-semibold text-ink">Member Management</h2>
			<p class="text-sm text-ink-muted mt-0.5">{$members.length} members registered</p>
		</div>
		<button class="btn-primary" on:click={openAdd}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
			Add member
		</button>
	</div>

	<div class="card p-0 overflow-hidden">
		<div class="p-4 border-b border-border">
			<input class="field max-w-xs" placeholder="Search members..." bind:value={search} />
		</div>

		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="text-left text-ink-faint text-xs uppercase tracking-wider border-b border-border">
						<th class="px-5 py-3 font-medium">Member</th>
						<th class="px-5 py-3 font-medium">Position</th>
						<th class="px-5 py-3 font-medium">Type</th>
						<th class="px-5 py-3 font-medium">Social</th>
						<th class="px-5 py-3 font-medium text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each filtered as member (member.id)}
						<tr class="border-b border-border last:border-0 hover:bg-surface-raised/50 transition-colors">
							<td class="px-5 py-3.5">
								<div class="flex items-center gap-3">
									<Avatar name={member.name} src={member.photo} size={36} />
									<span class="font-medium text-ink">{member.name}</span>
								</div>
							</td>
							<td class="px-5 py-3.5 text-ink-muted">{member.position}</td>
							<td class="px-5 py-3.5">
								<span class="chip {member.type === 'Core' ? 'text-accent border-accent/30' : ''}">{member.type}</span>
							</td>
							<td class="px-5 py-3.5">
								<div class="flex gap-2 text-ink-faint">
									{#each ['github', 'linkedin', 'facebook'] as key}
										{#if member[key]}
											<a href={member[key]} target="_blank" rel="noreferrer" class="hover:text-accent transition-colors" aria-label={key}>
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d={socialIcon(key)} /></svg>
											</a>
										{/if}
									{/each}
								</div>
							</td>
							<td class="px-5 py-3.5">
								<div class="flex justify-end gap-1.5">
									<button class="btn-ghost !px-2.5 !py-1.5" on:click={() => openEdit(member)} aria-label="Edit {member.name}">
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
									</button>
									<button class="btn-ghost !px-2.5 !py-1.5 hover:!text-danger" on:click={() => (deletingMember = member)} aria-label="Delete {member.name}">
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
									</button>
								</div>
							</td>
						</tr>
					{:else}
						<tr><td colspan="5" class="text-center py-10 text-ink-faint text-sm">No members match your search.</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

{#if showForm}
	<MemberForm member={editingMember} on:close={() => (showForm = false)} on:save={handleSave} />
{/if}

{#if deletingMember}
	<ConfirmDialog
		title="Delete member"
		message={`Remove ${deletingMember.name} from the club roster? This can't be undone.`}
		on:cancel={() => (deletingMember = null)}
		on:confirm={confirmDelete}
	/>
{/if}
