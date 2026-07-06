/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				base: {
					DEFAULT: '#0B0D10',
					soft: '#101318'
				},
				surface: {
					DEFAULT: '#14171C',
					raised: '#1B1F26',
					hover: '#212630'
				},
				border: {
					DEFAULT: '#242A33',
					light: '#2E3540'
				},
				ink: {
					DEFAULT: '#F5F6F7',
					muted: '#9AA1AC',
					faint: '#5C636E'
				},
				accent: {
					DEFAULT: '#FF6A1A',
					dim: '#E35C10',
					soft: '#FF8A45',
					wash: 'rgba(255,106,26,0.10)'
				},
				ok: '#34D399',
				danger: '#F2635F',
				warn: '#F2B84B'
			},
			fontFamily: {
				display: ['"Space Grotesk"', 'sans-serif'],
				body: ['"Inter"', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'monospace']
			},
			boxShadow: {
				card: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
				glow: '0 0 0 1px rgba(255,106,26,0.35), 0 0 24px -4px rgba(255,106,26,0.35)'
			},
			keyframes: {
				fadein: { '0%': { opacity: 0, transform: 'translateY(4px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
				popin: { '0%': { opacity: 0, transform: 'scale(0.96)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
				pulseNode: { '0%,100%': { opacity: 0.35 }, '50%': { opacity: 1 } }
			},
			animation: {
				fadein: 'fadein 0.25s ease-out',
				popin: 'popin 0.18s cubic-bezier(0.16,1,0.3,1)',
				pulseNode: 'pulseNode 3.5s ease-in-out infinite'
			}
		}
	},
	plugins: []
};
