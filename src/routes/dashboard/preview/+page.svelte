<script>
	import { members, projects, blogs } from '$lib/stores/data.js';
	import Avatar from '$lib/components/Avatar.svelte';

	const tabs = ['Members', 'Projects', 'Blogs'];
	let active = 'Members';

	function formatDate(d) {
		return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<svelte:head><title>Live Preview · Admin Portal</title></svelte:head>

<div class="animate-fadein space-y-5">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h2 class="font-display text-xl font-semibold text-ink">Live Preview</h2>
			<p class="text-sm text-ink-muted mt-0.5">Exactly what visitors see on the public site — updates the instant you save a change.</p>
		</div>
		<div class="flex items-center gap-2 text-xs text-ok font-mono">
			<span class="h-2 w-2 rounded-full bg-ok animate-pulseNode"></span> synced
		</div>
	</div>

	<div class="flex gap-1 border-b border-border">
		{#each tabs as tab}
			<button
				class="px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors {active === tab ? 'border-accent text-accent' : 'border-transparent text-ink-muted hover:text-ink'}"
				on:click={() => (active = tab)}
			>
				{tab}
			</button>
		{/each}
	</div>

	<!-- Simulated public site frame -->
	<div class="rounded-xl border border-border-light bg-[#0E1013] overflow-hidden">
		<div class="h-9 flex items-center gap-1.5 px-4 border-b border-border bg-surface">
			<span class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></span>
			<span class="ml-3 text-[11px] text-ink-faint font-mono">mlclub-nitsilchar.in / {active.toLowerCase()}</span>
		</div>

		<div class="p-6 sm:p-10">
			{#if active === 'Members'}
				<h3 class="font-display text-2xl font-semibold text-white text-center mb-8">Meet the Team</h3>
				<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each $members as member (member.id)}
						<div class="text-center animate-fadein">
							<div class="flex justify-center mb-3">
								<Avatar name={member.name} src={member.photo} size={72} />
							</div>
							<p class="font-display font-semibold text-white">{member.name}</p>
							<p class="text-sm text-ink-muted">{member.position}</p>
							<span class="chip mt-2 inline-block">{member.type}</span>
						</div>
					{:else}
						<p class="col-span-full text-center text-ink-faint text-sm py-10">No members to display yet.</p>
					{/each}
				</div>
			{:else if active === 'Projects'}
				<h3 class="font-display text-2xl font-semibold text-white text-center mb-8">Our Projects</h3>
				<div class="grid sm:grid-cols-2 gap-6">
					{#each $projects as project (project.id)}
						<div class="rounded-xl border border-border-light p-5 animate-fadein">
							<h4 class="font-display font-semibold text-white text-lg">{project.title}</h4>
							<p class="text-sm text-ink-muted mt-2 leading-relaxed">{project.description}</p>
							<div class="flex flex-wrap gap-1.5 mt-4">
								{#each project.tech as t}<span class="chip">{t}</span>{/each}
							</div>
						</div>
					{:else}
						<p class="col-span-full text-center text-ink-faint text-sm py-10">No projects to display yet.</p>
					{/each}
				</div>
			{:else}
				<h3 class="font-display text-2xl font-semibold text-white text-center mb-8">From the Blog</h3>
				<div class="max-w-2xl mx-auto space-y-8">
					{#each $blogs as post (post.id)}
						<article class="animate-fadein">
							<h4 class="font-display font-semibold text-white text-xl">{post.title}</h4>
							<p class="text-xs text-ink-faint font-mono mt-1.5">{post.author} · {formatDate(post.date)}</p>
							<p class="text-ink-muted leading-relaxed mt-3">{post.content}</p>
						</article>
					{:else}
						<p class="text-center text-ink-faint text-sm py-10">No posts to display yet.</p>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
