<script>
	import { auth } from '$lib/stores/auth.js';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	let userId = '';
	let password = '';
	let showPassword = false;
	let loading = false;
	let errorMsg = '';
	let fieldErrors = {};

	function validate() {
		fieldErrors = {};
		if (!userId.trim()) fieldErrors.userId = 'User ID is required.';
		if (!password) fieldErrors.password = 'Password is required.';
		else if (password.length < 4) fieldErrors.password = 'Password must be at least 4 characters.';
		return Object.keys(fieldErrors).length === 0;
	}

	async function handleSubmit() {
		errorMsg = '';
		if (!validate()) return;
		loading = true;
		const result = await auth.login(userId, password);
		loading = false;
		if (result.ok) {
			goto('/dashboard');
		} else {
			errorMsg = result.message;
		}
	}
</script>

<svelte:head>
	<title>Admin Login · ML Club, NIT Silchar</title>
</svelte:head>

<div class="min-h-screen bg-base flex items-center justify-center px-4 relative overflow-hidden">
	<!-- Signature network motif, quiet ambient background -->
	<svg class="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600">
		<g stroke="#FF6A1A" stroke-width="1">
			<line x1="80" y1="100" x2="260" y2="200" />
			<line x1="260" y1="200" x2="220" y2="380" />
			<line x1="260" y1="200" x2="460" y2="150" />
			<line x1="460" y1="150" x2="620" y2="260" />
			<line x1="220" y1="380" x2="420" y2="460" />
			<line x1="460" y1="150" x2="420" y2="460" />
			<line x1="620" y1="260" x2="720" y2="420" />
			<line x1="420" y1="460" x2="720" y2="420" />
		</g>
		<g class="fill-accent">
			<circle cx="80" cy="100" r="4" />
			<circle cx="260" cy="200" r="5" />
			<circle cx="220" cy="380" r="4" />
			<circle cx="460" cy="150" r="5" />
			<circle cx="620" cy="260" r="4" />
			<circle cx="420" cy="460" r="5" />
			<circle cx="720" cy="420" r="4" />
		</g>
	</svg>

	<div class="relative w-full max-w-sm animate-fadein">
		<div class="flex flex-col items-center mb-8">
			<div class="h-12 w-12 rounded-xl bg-accent flex items-center justify-center font-display font-bold text-white text-xl mb-4">M</div>
			<h1 class="font-display text-xl font-semibold text-ink">Machine Learning Club</h1>
			<p class="text-sm text-ink-muted mt-1">NIT Silchar · Admin Portal</p>
		</div>

		<div class="card p-7">
			<h2 class="font-display font-semibold text-base text-ink mb-1">Sign in</h2>
			<p class="text-sm text-ink-faint mb-6">Authorized administrators only.</p>

			<form class="space-y-4" on:submit|preventDefault={handleSubmit} novalidate>
				<div>
					<label class="label" for="userId">User ID</label>
					<input
						id="userId"
						class="field"
						bind:value={userId}
						autocomplete="username"
						placeholder="e.g. admin"
						aria-invalid={!!fieldErrors.userId}
					/>
					{#if fieldErrors.userId}<p class="text-xs text-danger mt-1">{fieldErrors.userId}</p>{/if}
				</div>

				<div>
					<label class="label" for="password">Password</label>
					<div class="relative">
						{#if showPassword}
							<input
								id="password"
								type="text"
								class="field pr-10"
								bind:value={password}
								autocomplete="current-password"
								placeholder="••••••••"
								aria-invalid={!!fieldErrors.password}
							/>
						{:else}
							<input
								id="password"
								type="password"
								class="field pr-10"
								bind:value={password}
								autocomplete="current-password"
								placeholder="••••••••"
								aria-invalid={!!fieldErrors.password}
							/>
						{/if}
						<button
							type="button"
							class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-muted"
							on:click={() => (showPassword = !showPassword)}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								{#if showPassword}
									<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.6 18.6 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
								{:else}
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/>
								{/if}
							</svg>
						</button>
					</div>
					{#if fieldErrors.password}<p class="text-xs text-danger mt-1">{fieldErrors.password}</p>{/if}
				</div>

				{#if errorMsg}
					<div class="rounded-lg bg-danger/10 border border-danger/30 px-3 py-2.5 text-sm text-danger" transition:fade={{ duration: 120 }}>
						{errorMsg}
					</div>
				{/if}

				<button type="submit" class="btn-primary w-full mt-2" disabled={loading}>
					{#if loading}
						<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25"/><path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" stroke-width="3"/></svg>
						Verifying...
					{:else}
						Sign in
					{/if}
				</button>
			</form>

			<p class="text-[11px] text-ink-faint text-center mt-5 font-mono">demo · admin / mlclub2026</p>
		</div>
	</div>
</div>
