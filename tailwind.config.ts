import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Warm, tactile color palette
				'paper': '#fefcf8',
				'warm-tan': '#f4f1ea',
				'warm-gray': '#e8e5de',
				'sage': '#8a9a7d',
				'dusty-blue': '#6b7c94',
				'charcoal': '#2d2d2d',
				'ink': '#1a1a1a',
				'pencil': '#6b6b6b',
				'coffee': '#8b7355',
				'cream': '#faf8f3',
				
				// Keep existing shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'serif': ['Crimson Pro', 'serif'],
				'sans': ['Inter', 'sans-serif'],
				'mono': ['JetBrains Mono', 'monospace'],
				'script': ['Kalam', 'cursive'],
			},
			backgroundImage: {
				'paper-texture': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJwYXBlciIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIj4KICAgICAgPGNpcmNsZSBjeD0iNSIgY3k9IjUiIHI9IjEiIGZpbGw9IiNmNGYxZWEiIG9wYWNpdHk9IjAuMyIvPgogICAgICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjE1IiByPSIwLjUiIGZpbGw9IiNlOGU1ZGUiIG9wYWNpdHk9IjAuNCIvPgogICAgICA8Y2lyY2xlIGN4PSI0NSIgY3k9IjM1IiByPSIxLjUiIGZpbGw9IiNmNGYxZWEiIG9wYWNpdHk9IjAuMiIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhcGVyKSIvPgo8L3N2Zz4=')",
				'linen-texture': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJsaW5lbiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj4KICAgICAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iNDAiIHkyPSI0MCIgc3Ryb2tlPSIjZjRmMWVhIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4zIi8+CiAgICAgIDxsaW5lIHgxPSI0MCIgeTE9IjAiIHgyPSIwIiB5Mj0iNDAiIHN0cm9rZT0iI2Y0ZjFlYSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMyIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2xpbmVuKSIvPgo8L3N2Zz4=')",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				// Keep existing animations
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				// New tactile animations
				'typewriter': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' }
				},
				'paper-lift': {
					'0%': { transform: 'translateY(0) rotate(0deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
					'100%': { transform: 'translateY(-2px) rotate(0.5deg)', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }
				},
				'ink-flow': {
					'0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
					'100%': { transform: 'scaleX(1)', transformOrigin: 'left' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'typewriter': 'typewriter 3s steps(30) infinite',
				'blink': 'blink 1s infinite',
				'paper-lift': 'paper-lift 0.3s ease-out',
				'ink-flow': 'ink-flow 0.5s ease-out'
			},
			boxShadow: {
				'paper': '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
				'paper-lift': '0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
				'inner-paper': 'inset 0 1px 3px rgba(0,0,0,0.06)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
