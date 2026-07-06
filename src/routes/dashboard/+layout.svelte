<script>
	import { auth } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Topbar from '$lib/components/Topbar.svelte';

	let sidebarOpen = false;
	let checked = false;

	const titles = {
		'/dashboard': 'Overview',
		'/dashboard/members': 'Member Management',
		'/dashboard/projects': 'Project Management',
		'/dashboard/blogs': 'Blog Management',
		'/dashboard/preview': 'Live Preview'
	};
	$: title = titles[$page.url.pathname] ?? 'Dashboard';

	onMount(() => {
		const unsub = auth.subscribe((state) => {
			if (!state.isAuthenticated) {
				goto('/auth');
			} else {
				checked = true;
			}
		});
		return unsub;
	});
</script>

{#if checked}
	<div class="min-h-screen flex bg-base">
		<Sidebar bind:open={sidebarOpen} />
		<div class="flex-1 flex flex-col min-w-0">
			<Topbar {title} onMenuClick={() => (sidebarOpen = true)} />
			<main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
				<slot />
			</main>
		</div>
	</div>
{:else}
	<div class="min-h-screen flex items-center justify-center bg-base text-ink-muted text-sm">
		Checking session...
	</div>
{/if}
