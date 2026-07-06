import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const SEED = {
	members: [
		{ id: 'm1', name: 'Aritra Sengupta', position: 'Club Coordinator', type: 'Core', photo: '', github: 'https://github.com/aritras', linkedin: 'https://linkedin.com/in/aritras', facebook: '' },
		{ id: 'm2', name: 'Priya Nair', position: 'Technical Lead', type: 'Core', photo: '', github: 'https://github.com/priyanair', linkedin: '', facebook: '' },
		{ id: 'm3', name: 'Rohan Verma', position: 'Founding Member', type: 'Core Alumnus', photo: '', github: 'https://github.com/rohanv', linkedin: 'https://linkedin.com/in/rohanv', facebook: 'https://facebook.com/rohanv' }
	],
	projects: [
		{ id: 'p1', title: 'CropSense', description: 'A computer-vision pipeline that detects crop disease from leaf imagery in real time.', tech: ['PyTorch', 'OpenCV', 'FastAPI'], github: 'https://github.com/mlclub/cropsense' },
		{ id: 'p2', title: 'VoiceNIT', description: 'On-device speech recognition tuned for regional accents, built for the campus assistant kiosk.', tech: ['Whisper', 'ONNX', 'Svelte'], github: 'https://github.com/mlclub/voicenit' }
	],
	blogs: [
		{ id: 'b1', title: 'Getting Started with Transformer Architectures', author: 'Priya Nair', date: '2026-06-18', content: 'Transformers reshaped how we approach sequence modelling. In this piece we walk through attention from first principles...' },
		{ id: 'b2', title: 'Our Journey to Smart India Hackathon Finals', author: 'Aritra Sengupta', date: '2026-05-02', content: 'Six months ago a team of five sat in the ML lab at 2am arguing about a loss curve that refused to converge...' }
	]
};

function persistentStore(key, seed) {
	let initial = seed;
	if (browser) {
		const stored = localStorage.getItem(key);
		if (stored) {
			try {
				initial = JSON.parse(stored);
			} catch {
				initial = seed;
			}
		}
	}
	const store = writable(initial);
	if (browser) {
		store.subscribe((value) => localStorage.setItem(key, JSON.stringify(value)));
	}
	return store;
}

function uid() {
	return Math.random().toString(36).slice(2, 10);
}

export const members = persistentStore('mlclub_members', SEED.members);
export const projects = persistentStore('mlclub_projects', SEED.projects);
export const blogs = persistentStore('mlclub_blogs', SEED.blogs);

export const membersApi = {
	add(member) {
		members.update((list) => [...list, { ...member, id: uid() }]);
	},
	update(id, patch) {
		members.update((list) => list.map((m) => (m.id === id ? { ...m, ...patch } : m)));
	},
	remove(id) {
		members.update((list) => list.filter((m) => m.id !== id));
	}
};

export const projectsApi = {
	add(project) {
		projects.update((list) => [...list, { ...project, id: uid() }]);
	},
	update(id, patch) {
		projects.update((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));
	},
	remove(id) {
		projects.update((list) => list.filter((p) => p.id !== id));
	}
};

export const blogsApi = {
	add(post) {
		blogs.update((list) => [{ ...post, id: uid() }, ...list]);
	},
	update(id, patch) {
		blogs.update((list) => list.map((b) => (b.id === id ? { ...b, ...patch } : b)));
	},
	remove(id) {
		blogs.update((list) => list.filter((b) => b.id !== id));
	}
};
