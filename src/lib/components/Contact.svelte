<script>
	import { reveal } from '$lib/reveal.js';

	const EMAIL = 'EriBeq21@htl-shkoder.com';
	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(EMAIL);
			copied = true;
			setTimeout(() => (copied = false), 2200);
		} catch {
			window.location.href = `mailto:${EMAIL}`;
		}
	}
</script>

<section id="contact" class="relative bg-[#0A0A0A] py-32">
	<!-- Big red glow -->
	<div class="pointer-events-none absolute bottom-0 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-[#E8003D] opacity-[0.06] blur-[120px]"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-20">
		<!-- Section header -->
		<div use:reveal class="mb-20">
			<p
				class="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8003D]"
				style="font-family:'JetBrains Mono',monospace"
			>03 — Contact</p>
			<h2 class="text-[clamp(2.5rem,7vw,6rem)] font-black leading-none tracking-tight text-white">
				Let's build<br /><span class="text-[#E8003D]">something.</span>
			</h2>
		</div>

		<div class="grid gap-12 lg:grid-cols-2 lg:gap-24">
			<!-- Left -->
			<div use:reveal={{ delay: 80 }}>
				<p class="mb-10 text-[1.15rem] leading-relaxed text-[#6B7280]">
					I'm available from <span class="text-white font-semibold">July 2026</span>. Looking for
					full-stack or data-driven frontend roles — remote or EU relocation.
				</p>

				<!-- Big copy button -->
				<button
					onclick={copyEmail}
					data-hover
					class="group mb-8 w-full rounded-2xl border border-white/8 bg-[#111] p-6 text-left transition-all hover:border-[#E8003D]/50"
					aria-label="Copy email"
				>
					<p class="mb-1 text-[11px] text-[#4B5563]" style="font-family:'JetBrains Mono',monospace">
						{copied ? '✓ Copied to clipboard!' : 'Click to copy email'}
					</p>
					<p
						class="text-[clamp(0.9rem,2.2vw,1.3rem)] font-bold text-white transition-colors group-hover:text-[#E8003D] break-all"
						style="font-family:'JetBrains Mono',monospace"
					>{EMAIL}</p>
				</button>

				<a
					href="mailto:{EMAIL}"
					data-hover
					class="group inline-flex items-center gap-3 rounded-full bg-[#E8003D] px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-[#C7003A]"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
					</svg>
					Send an email
				</a>

				<!-- Location tag -->
				<p class="mt-8 text-sm text-[#4B5563]">
					📍 Shkodër, Albania — open to remote &amp; EU relocation
				</p>
			</div>

			<!-- Right — socials + quick facts -->
			<div use:reveal={{ delay: 160 }} class="space-y-4">
				<a
					href="https://github.com/eribeq21"
					target="_blank"
					rel="noopener noreferrer"
					data-hover
					class="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#111] px-6 py-5 transition-all hover:border-white/20"
				>
					<div class="flex items-center gap-4">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" class="text-white/60 group-hover:text-white transition-colors">
							<path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
						</svg>
						<div>
							<p class="text-sm font-semibold text-white">GitHub</p>
							<p class="text-xs text-[#4B5563]" style="font-family:'JetBrains Mono',monospace">github.com/eribeq21</p>
						</div>
					</div>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[#4B5563] group-hover:text-white transition-colors">
						<path d="M7 17 17 7M7 7h10v10"/>
					</svg>
				</a>

				<a
					href="https://linkedin.com/in/eriseldi-beqiri-052aaa342"
					target="_blank"
					rel="noopener noreferrer"
					data-hover
					class="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#111] px-6 py-5 transition-all hover:border-[#0A66C2]/40"
				>
					<div class="flex items-center gap-4">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" class="text-white/60 group-hover:text-[#0A66C2] transition-colors">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
						<div>
							<p class="text-sm font-semibold text-white">LinkedIn</p>
							<p class="text-xs text-[#4B5563]" style="font-family:'JetBrains Mono',monospace">Eriseldi Beqiri</p>
						</div>
					</div>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[#4B5563] group-hover:text-[#0A66C2] transition-colors">
						<path d="M7 17 17 7M7 7h10v10"/>
					</svg>
				</a>

				<!-- Mini terminal fact -->
				<div class="rounded-2xl border border-white/[0.07] bg-[#111] p-5" style="font-family:'JetBrains Mono',monospace">
					<p class="text-[11px] text-[#4B5563] mb-3">$ whoami</p>
					<p class="text-[13px] text-[#6EE7B7]">eriseldi_beqiri</p>
					<p class="text-[11px] text-[#4B5563] mt-2">$ cat mission.txt</p>
					<p class="text-[12px] text-white/70 mt-1">Ship code that matters. Keep it fast. Make it beautiful.</p>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<div class="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 sm:flex-row">
			<span class="text-[11px] text-[#4B5563]" style="font-family:'JetBrains Mono',monospace">
				© 2026 Eriseldi Beqiri
			</span>
			<span class="text-[11px] text-[#4B5563]" style="font-family:'JetBrains Mono',monospace">
				Built with <span class="text-[#FF3E00]">SvelteKit</span> + <span class="text-[#06B6D4]">Tailwind CSS</span>
			</span>
		</div>
	</div>
</section>
