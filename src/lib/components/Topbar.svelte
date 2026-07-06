<script>
	import { auth } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	export let onMenuClick = () => {};
	export let title = 'Overview';

	let dropdownOpen = false;

	function logout() {
		auth.logout();
		goto('/auth');
	}

	function handleClickOutside(node) {
		function onClick(e) {
			if (!node.contains(e.target)) dropdownOpen = false;
		}
		document.addEventListener('click', onClick, true);
		return { destroy: () => document.removeEventListener('click', onClick, true) };
	}
</script>

<header class="h-16 shrink-0 border-b border-border bg-base/80 backdrop-blur flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
	<div class="flex items-center gap-3">
		<button class="lg:hidden text-ink-muted hover:text-ink p-1.5 rounded-md hover:bg-surface-raised" on:click={onMenuClick} aria-label="Open menu">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
		</button>
		<h1 class="font-display font-semibold text-lg text-ink">{title}</h1>
	</div>

	<div class="flex items-center gap-3">
		<div class="relative" use:handleClickOutside>
			<button
				class="flex items-center gap-2.5 rounded-lg pl-2 pr-3 py-1.5 hover:bg-surface-raised transition-colors"
				on:click={() => (dropdownOpen = !dropdownOpen)}
				aria-haspopup="true"
				aria-expanded={dropdownOpen}
			>
				<div class="h-8 w-8 rounded-full bg-surface-raised border border-border-light flex items-center justify-center text-accent font-display font-semibold text-sm">
					{($auth.userId || 'A')[0].toUpperCase()}
				</div>
				<div class="hidden sm:block text-left leading-tight">
					<p class="text-sm font-medium text-ink">{$auth.userId || 'Admin'}</p>
					<p class="text-[11px] text-ink-faint">Administrator</p>
				</div>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-ink-faint"><path d="M6 9l6 6 6-6"/></svg>
			</button>

			{#if dropdownOpen}
				<div
					class="absolute right-0 mt-2 w-48 card p-1.5 animate-fadein origin-top-right"
					transition:fade={{ duration: 120 }}
				>
					<div class="px-3 py-2 border-b border-border mb-1">
						<p class="text-sm font-medium text-ink truncate">{$auth.userId}</p>
						<p class="text-xs text-ink-faint">Signed in</p>
					</div>
					<button class="w-full text-left px-3 py-2 rounded-md text-sm text-ink-muted hover:bg-surface-raised hover:text-ink transition-colors">
						Profile settings
					</button>
					<button class="w-full text-left px-3 py-2 rounded-md text-sm text-danger hover:bg-danger/10 transition-colors" on:click={logout}>
						Log out
					</button>
				</div>
			{/if}
		</div>
		<button class="hidden sm:inline-flex btn-outline !py-1.5" on:click={logout}>Logout</button>
	</div>
</header>
