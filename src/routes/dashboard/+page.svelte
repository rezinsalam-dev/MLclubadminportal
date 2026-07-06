<script>
	import { members, projects, blogs } from '$lib/stores/data.js';
	import { auth } from '$lib/stores/auth.js';

	$: stats = [
		{ label: 'Members', value: $members.length, href: '/dashboard/members', icon: 'users' },
		{ label: 'Projects', value: $projects.length, href: '/dashboard/projects', icon: 'layers' },
		{ label: 'Blog posts', value: $blogs.length, href: '/dashboard/blogs', icon: 'file-text' }
	];

	const icons = {
		users: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
		layers: 'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5',
		'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6'
	};

	$: recentBlog = $blogs[0];
</script>

<svelte:head><title>Overview · Admin Portal</title></svelte:head>

<div class="animate-fadein space-y-8">
	<div>
		<h2 class="font-display text-2xl font-semibold text-ink">Welcome back, {$auth.userId}</h2>
		<p class="text-ink-muted text-sm mt-1">Here's what's happening with the club's content today.</p>
	</div>

	<div class="grid sm:grid-cols-3 gap-4">
		{#each stats as stat}
			<a href={stat.href} class="card p-5 flex items-center gap-4 hover:border-accent/40 transition-colors group">
				<div class="h-11 w-11 rounded-lg bg-accent-wash flex items-center justify-center text-accent shrink-0">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={icons[stat.icon]} /></svg>
				</div>
				<div>
					<p class="font-display text-2xl font-semibold text-ink">{stat.value}</p>
					<p class="text-sm text-ink-muted">{stat.label}</p>
				</div>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-auto text-ink-faint group-hover:text-accent group-hover:translate-x-0.5 transition-all"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
			</a>
		{/each}
	</div>

	<div class="grid lg:grid-cols-3 gap-4">
		<div class="card p-6 lg:col-span-2">
			<h3 class="font-display font-semibold text-ink mb-4">Quick actions</h3>
			<div class="grid sm:grid-cols-3 gap-3">
				<a href="/dashboard/members" class="btn-outline justify-start">+ Add member</a>
				<a href="/dashboard/projects" class="btn-outline justify-start">+ Add project</a>
				<a href="/dashboard/blogs" class="btn-outline justify-start">+ Write post</a>
			</div>
			<h3 class="font-display font-semibold text-ink mt-6 mb-3">Latest post</h3>
			{#if recentBlog}
				<div class="rounded-lg border border-border p-4">
					<p class="font-medium text-ink text-sm">{recentBlog.title}</p>
					<p class="text-xs text-ink-faint font-mono mt-1">{recentBlog.author} · {recentBlog.date}</p>
					<p class="text-sm text-ink-muted mt-2 line-clamp-2">{recentBlog.content}</p>
				</div>
			{:else}
				<p class="text-sm text-ink-faint">No posts yet.</p>
			{/if}
		</div>

		<div class="card p-6">
			<h3 class="font-display font-semibold text-ink mb-4">Sync status</h3>
			<div class="space-y-3">
				<div class="flex items-center gap-2 text-sm">
					<span class="h-2 w-2 rounded-full bg-ok animate-pulseNode"></span>
					<span class="text-ink-muted">Public site synced live</span>
				</div>
				<p class="text-xs text-ink-faint leading-relaxed">
					Every change made here reflects instantly on the public-facing pages — check the Live Preview tab to see it rendered.
				</p>
				<a href="/dashboard/preview" class="btn-outline w-full justify-center mt-2">Open Live Preview</a>
			</div>
		</div>
	</div>
</div>
