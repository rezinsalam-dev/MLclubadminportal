import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const ssr = false;

export function load() {
	if (browser) {
		const session = sessionStorage.getItem('mlclub_admin_session');
		const parsed = session ? JSON.parse(session) : null;
		throw redirect(302, parsed?.isAuthenticated ? '/dashboard' : '/auth');
	}
	throw redirect(302, '/auth');
}
