<script>
	import { page } from '$app/stores';

	export let open = false; // mobile drawer state

	const links = [
		{ href: '/dashboard', label: 'Overview', icon: 'grid' },
		{ href: '/dashboard/members', label: 'Members', icon: 'users' },
		{ href: '/dashboard/projects', label: 'Projects', icon: 'layers' },
		{ href: '/dashboard/blogs', label: 'Blogs', icon: 'file-text' },
		{ href: '/dashboard/preview', label: 'Live Preview', icon: 'eye' }
	];

	const icons = {
		grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
		users: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
		layers: 'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5',
		'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M16 13H8M16 17H8M10 9H8',
		eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
	};

	$: currentPath = $page.url.pathname;
	$: isActive = (href) => (href === '/dashboard' ? currentPath === href : currentPath.startsWith(href));
</script>

{#if open}
	<button class="fixed inset-0 z-30 bg-black/60 lg:hidden" on:click={() => (open = false)} aria-label="Close menu" />
{/if}

<aside
	class="fixed lg:static z-40 inset-y-0 left-0 w-64 shrink-0 bg-surface border-r border-border flex flex-col transition-transform duration-200 lg:translate-x-0 {open ? 'translate-x-0' : '-translate-x-full'}"
>
	<div class="h-16 flex items-center gap-2.5 px-5 border-b border-border">
		<div class="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-display font-bold text-white text-sm">M</div>
		<div class="leading-tight">
			<p class="font-display font-semibold text-sm text-ink">ML Club</p>
			<p class="text-[11px] text-ink-faint font-mono">NIT Silchar · Admin</p>
		</div>
	</div>

	<nav class="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
		{#each links as link}
			<a
				href={link.href}
				class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
					{isActive(link.href) ? 'bg-accent-wash text-accent' : 'text-ink-muted hover:text-ink hover:bg-surface-raised'}"
			>
				<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
					<path d={icons[link.icon]} />
				</svg>
				{link.label}
				{#if isActive(link.href)}
					<span class="ml-auto h-1.5 w-1.5 rounded-full bg-accent"></span>
				{/if}
			</a>
		{/each}
	</nav>

	<!-- Signature: quiet neural-node motif anchoring the sidebar footer -->
	<div class="relative h-20 border-t border-border overflow-hidden px-5 flex items-center">
		<svg class="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 256 80" fill="none">
			<line x1="20" y1="40" x2="70" y2="18" stroke="#242A33" stroke-width="1" />
			<line x1="20" y1="40" x2="70" y2="62" stroke="#242A33" stroke-width="1" />
			<line x1="70" y1="18" x2="130" y2="40" stroke="#242A33" stroke-width="1" />
			<line x1="70" y1="62" x2="130" y2="40" stroke="#242A33" stroke-width="1" />
			<line x1="130" y1="40" x2="190" y2="15" stroke="#242A33" stroke-width="1" />
			<line x1="130" y1="40" x2="190" y2="65" stroke="#242A33" stroke-width="1" />
			<circle cx="20" cy="40" r="3" class="fill-accent animate-pulseNode" />
			<circle cx="70" cy="18" r="2.5" fill="#5C636E" />
			<circle cx="70" cy="62" r="2.5" fill="#5C636E" />
			<circle cx="130" cy="40" r="3" class="fill-accent animate-pulseNode" style="animation-delay:1.2s" />
			<circle cx="190" cy="15" r="2.5" fill="#5C636E" />
			<circle cx="190" cy="65" r="2.5" fill="#5C636E" />
		</svg>
		<p class="relative text-[11px] text-ink-faint font-mono">v1.0 · build 2026.07</p>
	</div>
</aside>
