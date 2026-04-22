<script>
	import { onMount } from 'svelte';
	import { reveal } from '$lib/reveal.js';
	import { Layers, Zap, Brain, LineChart } from 'lucide-svelte';

	const skills = [
		{ label: 'SvelteKit', color: '#FF3E00' },
		{ label: 'TypeScript', color: '#3178C6' },
		{ label: 'PostgreSQL', color: '#336791' },
		{ label: 'Supabase', color: '#3ECF8E' },
		{ label: 'Tailwind CSS', color: '#06B6D4' },
		{ label: 'Node.js', color: '#339933' },
		{ label: 'Drizzle ORM', color: '#C5F74F' },
		{ label: 'OpenAI API', color: '#10a37f' },
		{ label: 'React', color: '#61DAFB' },
		{ label: 'Chart.js', color: '#FF6384' },
		{ label: 'D3.js', color: '#F9A03C' },
		{ label: 'Playwright', color: '#45BA4B' },
		{ label: 'MySQL', color: '#4479A1' },
		{ label: 'Git', color: '#F05032' },
		{ label: 'Vercel', color: '#888' },
		{ label: 'Docker', color: '#2496ED' },
		{ label: 'PWA', color: '#5A0FC8' },
		{ label: 'WebSockets', color: '#E8003D' },
		{ label: 'RESTful APIs', color: '#A78BFA' },
		{ label: 'RBAC', color: '#FCD34D' },
	];

	const row1 = skills.slice(0, 10);
	const row2 = skills.slice(10);

	const capabilities = [
		{
			Icon: Layers,
			title: 'Full-Stack Products',
			desc: 'End-to-end — from database schema to pixel-perfect UI. SvelteKit + PostgreSQL is home.',
			color: '#E8003D',
		},
		{
			Icon: Zap,
			title: 'Real-Time Systems',
			desc: 'WebSockets, Supabase realtime, live dashboards. SecurePass serves a live embassy 24/7.',
			color: '#3ECF8E',
		},
		{
			Icon: Brain,
			title: 'AI Integration',
			desc: 'OpenAI API for intelligent test generation — slashed manual QA effort by ~50% at Motrada.',
			color: '#A78BFA',
		},
		{
			Icon: LineChart,
			title: 'Data Visualisation',
			desc: 'Chart.js, D3.js, Recharts. Analytics-grade interfaces from raw API data.',
			color: '#F9A03C',
		},
	];

	const stats = [
		{ n: 5, suffix: '', l: 'live projects' },
		{ n: 352, suffix: 'h', l: 'internship' },
		{ n: 2, suffix: '+', l: 'years building' },
	];

	const codeFragments = [
		'const app = createApp()',
		'async function deploy()',
		'SELECT * FROM users',
		'.map(x => transform(x))',
		'useState<Session>(null)',
		'CREATE TABLE sessions',
		'git push origin main',
		'npm run build',
		'export default handler',
		'interface ApiResponse<T>',
		'await Promise.allSettled()',
		'ws.send(JSON.stringify(data))',
		'<SvelteKit />',
		'type Guard<T extends object>',
		'pg.query(sql, params)',
	];

	let statCounts = $state(stats.map(() => 0));
	let canvasEl = $state(null);

	onMount(() => {
		// ── Constellation canvas ──────────────────────────────────
		const canvas = /** @type {HTMLCanvasElement} */ (canvasEl);
		if (!canvas) return;
		const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
		let W = 0, H = 0, raf = 0;

		/** @type {{ x:number; y:number; vx:number; vy:number; r:number; op:number }[]} */
		let pts = [];
		const rand = (a, b) => Math.random() * (b - a) + a;

		function resize() {
			W = canvas.width = canvas.offsetWidth;
			H = canvas.height = canvas.offsetHeight;
		}
		function init() {
			pts = Array.from({ length: 38 }, () => ({
				x: rand(0, W), y: rand(0, H),
				vx: rand(-0.13, 0.13), vy: rand(-0.13, 0.13),
				r: rand(0.8, 2.2), op: rand(0.12, 0.45),
			}));
		}
		function frame() {
			ctx.clearRect(0, 0, W, H);
			// Connections
			for (let i = 0; i < pts.length; i++) {
				for (let j = i + 1; j < pts.length; j++) {
					const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
					if (d < 140) {
						ctx.beginPath();
						ctx.strokeStyle = `rgba(232,0,61,${0.065 * (1 - d / 140)})`;
						ctx.lineWidth = 0.6;
						ctx.moveTo(pts[i].x, pts[i].y);
						ctx.lineTo(pts[j].x, pts[j].y);
						ctx.stroke();
					}
				}
			}
			// Dots
			pts.forEach(p => {
				p.x = (p.x + p.vx + W) % W;
				p.y = (p.y + p.vy + H) % H;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255,255,255,${p.op})`;
				ctx.fill();
			});
			raf = requestAnimationFrame(frame);
		}

		resize(); init(); frame();
		const ro = new ResizeObserver(() => { resize(); init(); });
		ro.observe(canvas);

		// ── Counter animation ─────────────────────────────────────
		const statsEl = document.querySelector('#about-stats');
		const io = new IntersectionObserver(([e]) => {
			if (!e.isIntersecting) return;
			stats.forEach(({ n }, i) => {
				const dur = 1600, t0 = performance.now();
				const tick = (t) => {
					const p = Math.min((t - t0) / dur, 1);
					statCounts[i] = Math.round((1 - (1 - p) ** 3) * n);
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			});
			io.disconnect();
		}, { threshold: 0.5 });
		if (statsEl) io.observe(statsEl);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
		};
	});
</script>

<section id="about" class="relative overflow-hidden bg-[#0A0A0A] py-32">

	<!-- ① Constellation canvas -->
	<canvas
		bind:this={canvasEl}
		class="pointer-events-none absolute inset-0 h-full w-full"
		aria-hidden="true"
	></canvas>

	<!-- ② Ambient glowing orbs -->
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>
	</div>

	<!-- ③ Floating code fragments -->
	<div class="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
		{#each codeFragments as frag, i (frag)}
			<span
				class="code-frag absolute font-mono text-[10px] whitespace-nowrap"
				style="left:{(i * 41 + 7) % 88}%; top:{(i * 53 + 12) % 90}%; animation-duration:{22 + (i % 6) * 4}s; animation-delay:{i * 0.9}s;"
			>{frag}</span>
		{/each}
	</div>

	<!-- ④ Horizontal scan line -->
	<div class="scan-line pointer-events-none absolute left-0 right-0 h-px" aria-hidden="true"></div>

	<!-- Faint vertical line -->
	<div class="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/3"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-20">
		<!-- Header -->
		<div use:reveal class="mb-20 flex items-end gap-6">
			<div>
				<p
					class="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8003D]"
					style="font-family:'JetBrains Mono',monospace"
				>01 — What I do</p>
				<h2 class="text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight text-white">
					Built to ship.
				</h2>
			</div>
		</div>

		<!-- 2-col layout -->
		<div class="grid gap-16 lg:grid-cols-2 lg:gap-24">
			<!-- Short bio -->
			<div use:reveal={{ delay: 80 }}>
				<p class="text-[1.1rem] leading-[1.85] text-[#9CA3AF]">
					I'm a <span class="font-semibold text-white">Full-Stack Developer</span> graduating
					from HTL "Peter Mahringer" in June 2026. I build production-grade apps — databases,
					APIs, real-time features, polished UIs. My biggest project runs
					<span class="font-semibold text-[#E8003D]">live at the Austrian Embassy</span> in
					Tirana right now.
				</p>
				<p class="mt-6 text-[1.1rem] leading-[1.85] text-[#9CA3AF]">
					At <span class="font-semibold text-white">Motrada Handels GmbH</span> I built an
					AI-powered test tool using OpenAI + Playwright that cut manual QA by ~50%. I don't
					just write code — I ship things that work.
				</p>

				<!-- Animated stat row -->
				<div id="about-stats" class="mt-12 flex gap-8">
					{#each stats as s, i (s.l)}
						<div>
							<p class="stat-num text-[2.5rem] font-black leading-none text-white tabular-nums">
								{statCounts[i]}{s.suffix}
							</p>
							<p
								class="mt-1 text-[11px] text-[#4B5563]"
								style="font-family:'JetBrains Mono',monospace"
							>{s.l}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- Capability cards -->
			<div use:reveal={{ delay: 160 }} class="grid grid-cols-2 gap-4">
				{#each capabilities as cap (cap.title)}
					<div
						class="capability-card group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111] p-5 transition-all duration-300"
						style="--c:{cap.color};"
					>
						<!-- Top gradient reveal on hover -->
						<div
							class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
							style="background: radial-gradient(ellipse at 50% 0%, {cap.color}1a, transparent 65%);"
						></div>
						<!-- Bottom border beam on hover -->
						<div
							class="pointer-events-none absolute bottom-0 left-0 right-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							style="background: linear-gradient(90deg, transparent, {cap.color}cc, transparent);"
						></div>

						<!-- Icon -->
						<div
							class="icon-wrap relative z-10 mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
							style="background:{cap.color}18; color:{cap.color};"
						>
							<cap.Icon size={20} strokeWidth={1.5} />
						</div>

						<h3 class="relative z-10 mb-2 text-[13px] font-bold text-white">{cap.title}</h3>
						<p class="relative z-10 text-[12px] leading-relaxed text-[#6B7280]">{cap.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Marquee scrolling skills -->
	<div class="mt-24 overflow-hidden">
		<div class="mb-3 flex select-none">
			<div class="animate-marquee flex shrink-0 items-center gap-4 pr-4">
				{#each [...row1, ...row1] as s, i (s.label + 'a' + i)}
					<span
						class="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.07] bg-[#111] px-4 py-2 text-xs font-medium text-[#6B7280] transition-colors duration-200 hover:text-white"
					>
						<span
							class="h-1.75 w-1.75 rounded-full shrink-0"
							style="background:{s.color}; box-shadow: 0 0 6px {s.color}80;"
						></span>{s.label}
					</span>
				{/each}
			</div>
		</div>
		<div class="flex select-none">
			<div class="animate-marquee-rev flex shrink-0 items-center gap-4 pr-4">
				{#each [...row2, ...row2] as s, i (s.label + 'b' + i)}
					<span
						class="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.07] bg-[#111] px-4 py-2 text-xs font-medium text-[#6B7280] transition-colors duration-200 hover:text-white"
					>
						<span
							class="h-1.75 w-1.75 rounded-full shrink-0"
							style="background:{s.color}; box-shadow: 0 0 6px {s.color}80;"
						></span>{s.label}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* ── Ambient orbs ─────────────────────────────── */
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(90px);
		animation: orb-drift ease-in-out infinite;
	}
	.orb-1 {
		width: 520px; height: 520px;
		background: radial-gradient(circle, #e8003d44, transparent 70%);
		top: -140px; left: -120px;
		animation-duration: 24s;
	}
	.orb-2 {
		width: 420px; height: 420px;
		background: radial-gradient(circle, #3178c633, transparent 70%);
		top: 25%; right: -140px;
		animation-duration: 32s;
		animation-delay: -10s;
	}
	.orb-3 {
		width: 360px; height: 360px;
		background: radial-gradient(circle, #a78bfa2a, transparent 70%);
		bottom: 5%; left: 28%;
		animation-duration: 20s;
		animation-delay: -6s;
	}
	@keyframes orb-drift {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33%       { transform: translate(45px, -35px) scale(1.06); }
		66%       { transform: translate(-30px, 25px) scale(0.94); }
	}

	/* ── Floating code fragments ──────────────────── */
	.code-frag {
		color: rgba(255, 255, 255, 0.028);
		animation: frag-drift ease-in-out infinite alternate;
	}
	@keyframes frag-drift {
		0%   { transform: translateY(0px) translateX(0px);   opacity: 0.5; }
		50%  { transform: translateY(-18px) translateX(8px); opacity: 1;   }
		100% { transform: translateY(-36px) translateX(-6px); opacity: 0.4; }
	}

	/* ── Scan line ────────────────────────────────── */
	.scan-line {
		background: linear-gradient(90deg, transparent 0%, rgba(232, 0, 61, 0.5) 50%, transparent 100%);
		animation: scan-sweep 9s linear infinite;
		top: 0;
	}
	@keyframes scan-sweep {
		0%   { transform: translateY(0);      opacity: 0;   }
		4%   { opacity: 0.7; }
		96%  { opacity: 0.25; }
		100% { transform: translateY(1800px); opacity: 0;   }
	}

	/* ── Capability card hover ────────────────────── */
	.capability-card:hover {
		border-color: color-mix(in srgb, var(--c) 35%, transparent);
		background: #141414;
	}
	.icon-wrap {
		/* subtle pulse glow on card hover */
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.capability-card:hover .icon-wrap {
		box-shadow: 0 0 18px color-mix(in srgb, var(--c) 40%, transparent);
	}
</style>
