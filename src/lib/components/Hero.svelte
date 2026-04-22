<script>
	import { onMount } from 'svelte';

	// --- Typewriter ---
	const lines = [
		{ prefix: 'const dev = ', value: '"Eriseldi Beqiri"', color: '#E8003D' },
		{ prefix: 'role: ', value: '"Full-Stack Developer"', color: '#A78BFA' },
		{ prefix: 'stack: ', value: '["SvelteKit","TypeScript","PostgreSQL"]', color: '#6EE7B7' },
		{ prefix: 'status: ', value: '"Building things that ship"', color: '#FCD34D' },
	];

	let typed = $state(lines.map(() => ''));
	let cursors = $state(lines.map(() => true));

	async function typeAll() {
		for (let i = 0; i < lines.length; i++) {
			const full = lines[i].prefix + lines[i].value;
			for (let c = 0; c <= full.length; c++) {
				typed[i] = full.slice(0, c);
				await new Promise((r) => setTimeout(r, c < lines[i].prefix.length ? 48 : 28));
			}
			if (i < lines.length - 1) cursors[i] = false;
		}
	}

	let heroEl;

	// --- Rolling dev quotes ---
	const quotes = [
	{ q: '"It works on my machine."', who: '— every dev, ever' },
	{ q: '"I\'ll fix it later."', who: '— me, 3 years ago' },
	{ q: '"Just one more feature before deploy."', who: '— famous last words' },
	{ q: '"This is just temporary."', who: '— permanent since 2022' },
	{ q: '"git push --force"', who: '— no comment' },

	{ q: '"Why is this not working?"', who: '— after changing one line' },
	{ q: '"I have no idea what I\'m doing."', who: '— senior developer' },
	{ q: '"It was working yesterday."', who: '— every bug report' },
	{ q: '"Let’s refactor everything."', who: '— chaos starter' },
	{ q: '"It’s not a bug, it’s a feature."', who: '— coping mechanism' },
	{ q: '"Who wrote this code?"', who: '— me, looking in the mirror' },
	{ q: '"I’ll just quickly fix this."', who: '— 4 hours later' },
	{ q: '"Works fine, don’t touch it."', who: '— system stability expert' },
	{ q: '"Why is production on fire?"', who: '— Monday morning' },
	{ q: '"It compiled, ship it."', who: '— risky decision maker' },
	{ q: '"I changed one thing and everything broke."', who: '— cause unknown' },
	{ q: '"Let’s add one more dependency."', who: '— dependency hell architect' },
	{ q: '"This should be easy."', who: '— famous misunderstanding' },
	{ q: '"We don’t need tests."', who: '— future regret' },
	{ q: '"I commented it, so I’ll remember."', who: '— liar' },
	{ q: '"Why is it slow now?"', who: '— after adding a for-loop' },
	{ q: '"It’s probably cache."', who: '— guessing enthusiast' },
	{ q: '"Just restart it."', who: '— IT support philosophy' },
	{ q: '"Merge conflict? I’ll just force it."', who: '— danger mode' },
	{ q: '"We’ll optimize later."', who: '— never happens' },
	{ q: '"It works… I think."', who: '— confidence: low' },
	{ q: '"Let’s deploy on Friday."', who: '— chaos coordinator' },
	{ q: '"This is the final version."', who: '— version 47' },
	{ q: '"I didn’t touch that file."', who: '— suspiciously guilty dev' },
	{ q: '"It’s not broken, it’s loading."', who: '— denial stage' },
	{ q: '"Why does this exist?"', who: '— archaeology in codebase' },
	{ q: '"We’ll migrate it soon."', who: '— legacy system survivor' },
	{ q: '"It’s a quick fix."', who: '— nothing is quick' },
	{ q: '"I think I fixed it."', who: '— unsure optimism' },
	{ q: '"Let’s just hardcode it."', who: '— temporary forever' },
	{ q: '"It’s probably DNS."', who: '— blame distributor' },
	{ q: '"Works locally."', who: '— useless information' },
	{ q: '"We need microservices."', who: '— overengineering phase' },
	{ q: '"Why is this function 500 lines?"', who: '— history lesson' },
	{ q: '"I forgot semicolon."', who: '— pain experience' },
	{ q: '"It’s just a warning."', who: '— famous last assumption' }
];
	let qIdx = $state(0);
	let qVisible = $state(true);

	// --- Canvas refs ---
	/** @type {HTMLCanvasElement} */
	let gitCanvas = $state(null);
	/** @type {HTMLCanvasElement} */
	let rainCanvas = $state(null);

	// --- Content entrance state ---
	let heroVisible = $state(false);

	onMount(() => {
		// Entrance animation trigger
		requestAnimationFrame(() => {
			heroVisible = true;
		});

		typeAll();

		// Quote rotator
		const interval = setInterval(async () => {
			qVisible = false;
			await new Promise((r) => setTimeout(r, 400));
			qIdx = (qIdx + 1) % quotes.length;
			qVisible = true;
		}, 3800);

		// ── Dev-symbol rain ───────────────────────────────────────
		const rc = rainCanvas;
		const rctx = rc.getContext('2d');
		const symbols = [
			'{}', '=>', '</>', '&&', '||', 'fn()', ';;', '!==',
			'const', 'async', 'await', 'import', 'return', 'type',
			'null', '0x', '∑', 'λ', '∞', '≠', '01', '10',
		];
		let rW = 0, rH = 0;
		let drops = [];
		const rainColors = ['#E8003D', '#3178C6', '#6EE7B7', '#A78BFA', '#FCD34D', '#FF3E00'];

		function hexToRgb(hex) {
			const h = hex.replace('#', '');
			return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
		}

		function resizeRain() {
			rW = rc.width = rc.offsetWidth;
			rH = rc.height = rc.offsetHeight;
			drops = Array.from({ length: 55 }, () => ({
				x: Math.random() * rW,
				y: Math.random() * rH,
				speed: 0.22 + Math.random() * 0.55,
				sym: symbols[Math.floor(Math.random() * symbols.length)],
				op: 0.03 + Math.random() * 0.09,
				size: 9 + Math.floor(Math.random() * 7),
				color: rainColors[Math.floor(Math.random() * rainColors.length)],
			}));
		}

		let rainRaf;
		function rainFrame() {
			rctx.clearRect(0, 0, rW, rH);
			drops.forEach((d) => {
				const [r2, g2, b2] = hexToRgb(d.color);
				rctx.font = `${d.size}px 'JetBrains Mono', monospace`;
				rctx.fillStyle = `rgba(${r2},${g2},${b2},${d.op})`;
				rctx.fillText(d.sym, d.x, d.y);
				d.y += d.speed;
				if (d.y > rH + 20) {
					d.y = -20;
					d.x = Math.random() * rW;
					d.sym = symbols[Math.floor(Math.random() * symbols.length)];
				}
			});
			rainRaf = requestAnimationFrame(rainFrame);
		}
		resizeRain();
		rainRaf = requestAnimationFrame(rainFrame);
		const rrO = new ResizeObserver(() => resizeRain());
		rrO.observe(rc);

		// ── Live Git graph canvas ─────────────────────────────────
		const gc = gitCanvas;
		const gctx = gc.getContext('2d');

		const commitMessages = [
			'feat: init SvelteKit project',
			'chore: add Tailwind CSS',
			'feat: PostgreSQL schema',
			'fix: auth middleware',
			'feat: WebSocket realtime',
			'feat: OpenAI integration',
			'test: Playwright setup',
			'ci: deploy to Vercel',
			'feat: RBAC system',
			'fix: edge case null check',
			'perf: query optimisation',
			'feat: live at embassy 🎉',
		];

		const branchColors = ['#E8003D', '#A78BFA', '#3ECF8E', '#3178C6', '#FCD34D'];
		let commits = [];
		let gW = 0, gH = 0;
		const branchCount = 5;

		function branchX(idx, w) {
			return w * 0.08 + (idx / (branchCount - 1)) * w * 0.84;
		}

		let gitRaf;
		let commitTimer = 0;
		let msgIdx = 0;
		let lastTime = 0;

		function resizeGit() {
			gW = gc.width = gc.offsetWidth;
			gH = gc.height = gc.offsetHeight;
		}

		function gitFrame(ts) {
			if (!lastTime) lastTime = ts;
			const dt = ts - lastTime;
			lastTime = ts;
			commitTimer += dt;

			gctx.clearRect(0, 0, gW, gH);

			// Spawn new commit every ~1.4s, loop forever
			if (commitTimer > 1400) {
				const branch = msgIdx % branchCount;
				commits.push({
					x: branchX(branch, gW),
					y: gH + 30,
					branch,
					msg: commitMessages[msgIdx % commitMessages.length],
					alpha: 0,
					radius: 6,
				});
				msgIdx++;
				commitTimer = 0;
			}

			// Draw faint branch guide lines
			for (let b = 0; b < branchCount; b++) {
				gctx.beginPath();
				gctx.strokeStyle = 'rgba(255,255,255,0.03)';
				gctx.lineWidth = 1;
				gctx.setLineDash([4, 8]);
				gctx.moveTo(branchX(b, gW), 0);
				gctx.lineTo(branchX(b, gW), gH);
				gctx.stroke();
				gctx.setLineDash([]);
			}

			commits.forEach((c, i) => {
				c.y -= 0.38;
				c.alpha = Math.min(c.alpha + 0.015, 1);

				const [cr, cg, cb] = hexToRgb(branchColors[c.branch]);

				// Bezier merge line to previous commit
				if (i > 0 && i % 3 === 0) {
					const prev = commits[i - 1];
					gctx.beginPath();
					gctx.strokeStyle = `rgba(${cr},${cg},${cb},${c.alpha * 0.18})`;
					gctx.lineWidth = 1;
					gctx.moveTo(c.x, c.y);
					gctx.bezierCurveTo(c.x, c.y - 30, prev.x, prev.y + 30, prev.x, prev.y);
					gctx.stroke();
				}

				// Glow ring
				const grd = gctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 18);
				grd.addColorStop(0, `rgba(${cr},${cg},${cb},${c.alpha * 0.22})`);
				grd.addColorStop(1, 'transparent');
				gctx.beginPath();
				gctx.arc(c.x, c.y, 18, 0, Math.PI * 2);
				gctx.fillStyle = grd;
				gctx.fill();

				// Commit dot
				gctx.beginPath();
				gctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
				gctx.fillStyle = `rgba(${cr},${cg},${cb},${c.alpha})`;
				gctx.fill();

				// SHA label
				const sha = (i % 16).toString(16).padStart(7, '0');
				gctx.font = '9px JetBrains Mono, monospace';
				gctx.fillStyle = `rgba(255,255,255,${c.alpha * 0.25})`;
				gctx.fillText(sha, c.x + 12, c.y + 3);

				// Commit message
				if (c.alpha > 0.4) {
					const side = c.branch % 2 === 0 ? -1 : 1;
					const tx = c.x + side * 18;
					gctx.font = '10px JetBrains Mono, monospace';
					gctx.fillStyle = `rgba(${cr},${cg},${cb},${(c.alpha - 0.4) * 0.5})`;
					gctx.textAlign = side === -1 ? 'right' : 'left';
					gctx.fillText(c.msg, tx, c.y + 3);
					gctx.textAlign = 'left';
				}
			});

			commits = commits.filter((c) => c.y > -40);
			gitRaf = requestAnimationFrame(gitFrame);
		}

		resizeGit();
		gitRaf = requestAnimationFrame(gitFrame);
		const grO = new ResizeObserver(() => resizeGit());
		grO.observe(gc);

		return () => {
			clearInterval(interval);
			cancelAnimationFrame(rainRaf);
			cancelAnimationFrame(gitRaf);
			rrO.disconnect();
			grO.disconnect();
		};
	});
</script>

<section
	id="home"
	bind:this={heroEl}
	class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#0A0A0A]"
>
	<!-- ① Dev-symbol rain canvas -->
	<canvas
		bind:this={rainCanvas}
		class="pointer-events-none absolute inset-0 h-full w-full"
		aria-hidden="true"
	></canvas>

	<!-- ② Live Git graph canvas -->
	<canvas
		bind:this={gitCanvas}
		class="pointer-events-none absolute inset-0 h-full w-full opacity-70"
		aria-hidden="true"
	></canvas>

	<!-- ③ Ambient glows -->
	<div
		class="pointer-events-none absolute -left-40 -top-40 h-150 w-150 rounded-full bg-[#E8003D] opacity-[0.07] blur-[120px]"
	></div>
	<div
		class="pointer-events-none absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-[#7C3AED] opacity-[0.06] blur-[120px]"
	></div>

	<!-- ④ Grain overlay -->
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.03]"
		style="background-image:url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;);background-size:180px"
	></div>

	<!-- ⑤ Grid lines -->
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.04]"
		style="background-image: linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px); background-size: 80px 80px;"
	></div>

	<!-- ── MAIN CONTENT ─────────────────────────── -->
	<div class="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 lg:px-20 lg:pt-28">
		<div class="grid gap-16 lg:grid-cols-[1fr_420px] lg:gap-8">

			<!-- LEFT — staggered entrance -->
			<div class="flex flex-col justify-center">

				<!-- Eyebrow tag -->
				<div
					class="entrance-item mb-8 flex items-center gap-3"
					class:entrance-visible={heroVisible}
					style="transition-delay:0ms"
				>
					<div class="h-px w-10 bg-[#E8003D]"></div>
					<span
						class="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8003D]"
						style="font-family:'JetBrains Mono',monospace"
					>Portfolio · 2026</span>
				</div>

				<!-- Big name -->
				<h1
					class="entrance-item mb-2 text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white"
					class:entrance-visible={heroVisible}
					style="transition-delay:120ms"
				>
					Eriseldi<br />
					<span class="text-[#E8003D]">Beqiri</span>
				</h1>

				<!-- Role line -->
				<p
					class="entrance-item mb-12 mt-5 text-[clamp(0.9rem,1.5vw,1.1rem)] text-[#4B5563]"
					class:entrance-visible={heroVisible}
					style="font-family:'JetBrains Mono',monospace; transition-delay:240ms"
				>
					Full-Stack Developer &nbsp;·&nbsp; SvelteKit &nbsp;·&nbsp; TypeScript &nbsp;·&nbsp;
					PostgreSQL
				</p>

				<!-- CTA row -->
				<div
					class="entrance-item mb-16 flex flex-wrap gap-4"
					class:entrance-visible={heroVisible}
					style="transition-delay:360ms"
				>
					<a
						href="#projects"
						data-hover
						class="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#E8003D] px-8 py-3.5 text-sm font-bold text-white"
					>
						<span class="relative z-10">See the work</span>
						<span
							class="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0"
						></span>
					</a>
					<a
						href="mailto:EriBeq21@htl-shkoder.com"
						data-hover
						class="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-sm font-bold text-white/70 transition-all hover:border-white/40 hover:text-white"
					>
						Say hello
					</a>
				</div>

				<!-- Social row -->
				<div
					class="entrance-item flex items-center gap-6"
					class:entrance-visible={heroVisible}
					style="transition-delay:480ms"
				>
					<a
						href="https://github.com/eribeq21"
						target="_blank"
						rel="noopener noreferrer"
						data-hover
						class="text-[#4B5563] transition-colors hover:text-white"
						aria-label="GitHub"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
							/>
						</svg>
					</a>
					<a
						href="https://linkedin.com/in/eriseldi-beqiri-052aaa342"
						target="_blank"
						rel="noopener noreferrer"
						data-hover
						class="text-[#4B5563] transition-colors hover:text-[#0A66C2]"
						aria-label="LinkedIn"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
							/>
						</svg>
					</a>
					<div class="h-3 w-px bg-white/10"></div>
					<span
						class="text-[11px] text-[#4B5563]"
						style="font-family:'JetBrains Mono',monospace"
					>Shkodër, Albania</span>
				</div>
			</div>

			<!-- RIGHT — Terminal + Photo + Quote -->
			<div
				class="entrance-item flex flex-col gap-5"
				class:entrance-visible={heroVisible}
				style="transition-delay:200ms"
			>
				<!-- Terminal window -->
				<div
					class="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] shadow-2xl"
				>
					<div class="flex items-center gap-2 border-b border-white/6 px-4 py-3">
						<div class="h-3 w-3 rounded-full bg-[#FF5F57]"></div>
						<div class="h-3 w-3 rounded-full bg-[#FFBD2E]"></div>
						<div class="h-3 w-3 rounded-full bg-[#28C840]"></div>
						<span
							class="ml-3 text-[10px] text-[#3B3B3B]"
							style="font-family:'JetBrains Mono',monospace"
						>~/eriseldi/about.ts</span>
					</div>
					<div
						class="space-y-2 p-6 text-[13px] leading-snug"
						style="font-family:'JetBrains Mono',monospace"
					>
						{#each lines as line, i (i)}
							<div class="flex">
								<span class="mr-4 w-4 select-none text-[#3B3B3B]">{i + 1}</span>
								<span>
									{#if typed[i].length <= line.prefix.length}
										<span class="text-[#6B7280]">{typed[i]}</span>
									{:else}
										<span class="text-[#6B7280]">{line.prefix}</span>
										<span style="color:{line.color}"
											>{typed[i].slice(line.prefix.length)}</span
										>
									{/if}
									{#if cursors[i]}
										<span
											class="inline-block w-0.5 translate-y-px bg-white"
											style="height:1em;animation:blink 1s step-end infinite"
										></span>
									{/if}
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Photo card -->
				<div class="relative overflow-hidden rounded-2xl" style="transform:rotate(-1.5deg)">
					<img
						src="/profile/Eriseldi_Beqiri_Personal_Picture.png"
						alt="Eriseldi Beqiri"
						class="h-52 w-full object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
					/>
					<div class="absolute inset-0 bg-linear-to-t from-[#0A0A0A]/80 to-transparent"></div>
					<div
						class="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-sm"
					>
						<span class="h-2 w-2 animate-pulse rounded-full bg-[#E8003D]"></span>
						<span
							class="text-[10px] font-medium text-white/70"
							style="font-family:'JetBrains Mono',monospace"
						>Available Jul 2026</span>
					</div>
				</div>

				<!-- Rotating dev quote -->
				<div
					class="rounded-2xl border border-white/[0.07] bg-[#111111] p-5 transition-opacity duration-400"
					class:opacity-0={!qVisible}
					class:opacity-100={qVisible}
				>
					<p class="text-sm italic text-white/80" style="font-family:'JetBrains Mono',monospace">
						{quotes[qIdx].q}
					</p>
					<p class="mt-2 text-[11px] text-[#4B5563]" style="font-family:'JetBrains Mono',monospace">
						{quotes[qIdx].who}
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll hint -->
	<div
		class="entrance-item absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
		class:entrance-visible={heroVisible}
		style="transition-delay:700ms"
	>
		<div class="h-8 w-px bg-linear-to-b from-transparent to-[#E8003D] opacity-60"></div>
	</div>
</section>

<style>
	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	/* Entrance animation — items boot in from below */
	.entrance-item {
		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.entrance-visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>
