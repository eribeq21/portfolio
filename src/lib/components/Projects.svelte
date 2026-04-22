<script>
	import { reveal } from '$lib/reveal.js';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';

	const projects = [
		{
			num: '01',
			name: 'SecurePass Embassy',
			badge: 'Live · Production',
			url: 'https://securepass.at',
			img: '/projects/securepass.png',
			blurb: 'PWA running live at the Austrian Embassy in Tirana — RBAC, QR check-in, real-time Supabase, automated RSVP emails, multi-tenant.',
			tags: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Supabase', 'WebSockets', 'RBAC'],
			accent: '#E8003D',
			featured: true,
		},
		{
			num: '02',
			name: 'Furniture Configurator',
			badge: 'Live Demo',
			url: 'https://furniture-configurator-nine.vercel.app/',
			img: '/projects/furniture.png',
			blurb: 'Interactive 3D furniture configurator — switch materials, colors, configs with instant visual feedback.',
			tags: ['SvelteKit', 'TypeScript', 'Tailwind CSS'],
			accent: '#2563EB',
			featured: false,
		},
		{
			num: '03',
			name: 'Weather Dashboard',
			badge: 'Live Demo',
			url: 'https://chartjs-three-rho.vercel.app/',
			img: '/projects/charts.png',
			blurb: 'Real-time weather API dashboard — temperature, humidity, wind. Analytics-grade charts with Chart.js.',
			tags: ['SvelteKit', 'Chart.js', 'REST API', 'Tailwind CSS'],
			accent: '#7C3AED',
			featured: false,
		},
		{
			num: '04',
			name: 'Kanban Board',
			badge: 'PWA',
			url: 'https://kanban-board-eight-omega.vercel.app/',
			img: '/projects/kanban.png',
			blurb: 'Drag-and-drop task manager. CSV/.ics export, offline mode, installable PWA.',
			tags: ['SvelteKit', 'JavaScript', 'PWA'],
			accent: '#D97706',
			featured: false,
		},
		{
			num: '05',
			name: 'Instagram Clone',
			badge: 'Live Demo',
			url: 'https://insta-clone-theta-lake.vercel.app/',
			img: '/projects/insta.png',
			blurb: 'Full-featured social clone — feed, auth, likes, comments, profiles. Deep full-stack practice.',
			tags: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Supabase'],
			accent: '#E1306C',
			featured: false,
		},
	];

	const featured = projects[0];
	const rest = projects.slice(1);
</script>

<section id="projects" class="relative bg-[#0A0A0A] py-32">
	<!-- Glow -->
	<div class="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#E8003D] opacity-[0.05] blur-[100px]"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-20">
		<!-- Section header -->
		<div use:reveal class="mb-16 flex items-end justify-between">
			<div>
				<p
					class="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8003D]"
					style="font-family:'JetBrains Mono',monospace"
				>02 — Work</p>
				<h2 class="text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight text-white">
					Selected<br /><span class="text-[#E8003D]">projects.</span>
				</h2>
			</div>
			<span class="hidden text-[11px] text-[#4B5563] lg:block" style="font-family:'JetBrains Mono',monospace">
				5 shipped
			</span>
		</div>

		<!-- FEATURED project — big -->
		<div
			use:reveal={{ delay: 60 }}
			class="group mb-6 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#111] transition-all duration-500 hover:border-[#E8003D]/30"
		>
			<div class="flex flex-col lg:flex-row">
				<!-- Image — left, 55% -->
				<div class="relative overflow-hidden lg:w-[55%]">
					<img
						src={featured.img}
						alt={featured.name}
						class="h-64 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 lg:h-full"
					/>
					<div class="absolute inset-0 bg-linear-to-r from-transparent to-[#111]/60 lg:block hidden"></div>
					<div class="absolute inset-0 bg-linear-to-t from-[#111]/60 to-transparent lg:hidden"></div>
				</div>
				<!-- Info — right -->
				<div class="flex flex-1 flex-col justify-center p-8 lg:p-12">
					<div class="mb-4 flex items-center gap-3">
						<span
							class="rounded-full bg-[#E8003D] px-3 py-1 text-[10px] font-bold text-white"
						>FEATURED</span>
						<span
							class="flex items-center gap-1.5 rounded-full border border-[#059669]/30 px-3 py-1 text-[10px] font-semibold text-[#059669]"
						>
							<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#059669]"></span>
							{featured.badge}
						</span>
					</div>
					<h3 class="mb-4 text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-tight text-white">
						{featured.name}
					</h3>
					<p class="mb-6 text-[15px] leading-relaxed text-[#6B7280]">{featured.blurb}</p>
					<div class="mb-8 flex flex-wrap gap-2">
						{#each featured.tags as tag (tag)}
							<span
								class="rounded-lg border border-white/[0.07] bg-white/4 px-2.5 py-1 text-[11px] text-[#6B7280]"
							>{tag}</span>
						{/each}
					</div>
					<a
						href={featured.url}
						target="_blank"
						rel="noopener noreferrer"
						data-hover
						class="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8003D] px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105"
					>
						Visit securepass.at <ArrowUpRight size={15} />
					</a>
				</div>
			</div>
		</div>

		<!-- 4 smaller cards in 2x2 grid -->
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each rest as proj, i (proj.num)}
				<div
					use:reveal={{ delay: i * 70 + 100, y: 32 }}
					class="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111] transition-all duration-300 hover:border-white/15"
				>
					<!-- Thumb -->
					<div class="relative overflow-hidden">
						<img
							src={proj.img}
							alt={proj.name}
							class="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
						/>
						<div class="absolute inset-0 bg-linear-to-t from-[#111] to-transparent opacity-60"></div>
						<!-- Accent dot -->
						<div
							class="absolute right-3 top-3 h-2 w-2 rounded-full"
							style="background:{proj.accent}"
						></div>
					</div>
					<!-- Content -->
					<div class="flex flex-1 flex-col p-5">
						<div class="mb-2 flex items-center justify-between">
							<span
								class="text-[10px] font-semibold text-[#4B5563]"
								style="font-family:'JetBrains Mono',monospace"
							>{proj.num}</span>
							<span
								class="text-[10px] text-[#4B5563]"
								style="font-family:'JetBrains Mono',monospace;color:{proj.accent}"
							>{proj.badge}</span>
						</div>
						<h3 class="mb-2 font-bold text-white transition-colors group-hover:text-[#E8003D]">
							{proj.name}
						</h3>
						<p class="mb-4 flex-1 text-[12px] leading-relaxed text-[#4B5563]">{proj.blurb}</p>
						<div class="flex flex-wrap gap-1.5 mb-4">
							{#each proj.tags.slice(0, 3) as tag (tag)}
								<span class="rounded text-[10px] text-[#4B5563]" style="font-family:'JetBrains Mono',monospace">{tag}</span>
							{/each}
						</div>
						{#if proj.url != null}
							{@const u = proj.url}
							<a
								href={u}
								target="_blank"
								rel="noopener noreferrer"
								data-hover
								class="flex items-center gap-1 text-[12px] font-semibold transition-colors"
								style="color:{proj.accent}"
							>
								View live <ArrowUpRight size={12} />
							</a>
						{:else}
							<span class="text-[12px] text-[#4B5563]" style="font-family:'JetBrains Mono',monospace">In progress…</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
