import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Simulated credential store. In production this would be a real backend call.
const VALID_CREDENTIALS = {
	admin: 'mlclub2026',
	root: 'nitsilchar'
};

function createAuthStore() {
	const initial = browser && sessionStorage.getItem('mlclub_admin_session')
		? JSON.parse(sessionStorage.getItem('mlclub_admin_session'))
		: { isAuthenticated: false, userId: null };

	const { subscribe, set } = writable(initial);

	return {
		subscribe,
		/**
		 * Simulates a network authentication call.
		 * @returns {Promise<{ok: boolean, message?: string}>}
		 */
		login(userId, password) {
			return new Promise((resolve) => {
				setTimeout(() => {
					const trimmedId = userId.trim();
					if (!trimmedId || !password) {
						resolve({ ok: false, message: 'User ID and password are required.' });
						return;
					}
					const expected = VALID_CREDENTIALS[trimmedId.toLowerCase()];
					if (expected && expected === password) {
						const session = { isAuthenticated: true, userId: trimmedId };
						set(session);
						if (browser) sessionStorage.setItem('mlclub_admin_session', JSON.stringify(session));
						resolve({ ok: true });
					} else {
						resolve({ ok: false, message: 'Invalid User ID or password.' });
					}
				}, 550); // simulated latency
			});
		},
		logout() {
			set({ isAuthenticated: false, userId: null });
			if (browser) sessionStorage.removeItem('mlclub_admin_session');
		}
	};
}

export const auth = createAuthStore();
