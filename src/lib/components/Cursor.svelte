<script>
	import { onMount } from 'svelte';

	let mx = $state(-300);
	let my = $state(-300);
	let tx = $state(-300);
	let ty = $state(-300);
	let hov = $state(false);
	let click = $state(false);
	let ready = $state(false);

	onMount(() => {
		const onMove = (e) => {
			// First move: snap both positions so ring doesn't streak from off-screen
			if (!ready) {
				mx = tx = e.clientX;
				my = ty = e.clientY;
				ready = true;
			} else {
				mx = e.clientX;
				my = e.clientY;
			}
			const el = document.elementFromPoint(e.clientX, e.clientY);
			hov = !!(el?.closest('a,button,[data-hover]'));
		};
		const onDown = () => (click = true);
		const onUp = () => (click = false);

		window.addEventListener('mousemove', onMove);
		window.addEventListener('mousedown', onDown);
		window.addEventListener('mouseup', onUp);

		let raf;
		const lerp = (a, b, f) => a + (b - a) * f;
		const loop = () => {
			tx = lerp(tx, mx, 0.12);
			ty = lerp(ty, my, 0.12);
			raf = requestAnimationFrame(loop);
		};
		loop();

		return () => {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mousedown', onDown);
			window.removeEventListener('mouseup', onUp);
			cancelAnimationFrame(raf);
		};
	});
</script>

{#if ready}
	<!-- Lagging ring -->
	<div
		class="pointer-events-none fixed rounded-full"
		style="
			left: {tx}px;
			top: {ty}px;
			width: {hov ? 52 : click ? 18 : 38}px;
			height: {hov ? 52 : click ? 18 : 38}px;
			border: 1.5px solid rgba(255,255,255,0.75);
			transform: translate(-50%,-50%);
			transition: width 0.15s ease, height 0.15s ease, border-color 0.15s ease;
			z-index: 99999;
			will-change: left, top;
			{hov ? 'border-color: #E8003D;' : ''}
		"
	></div>
	<!-- Instant dot -->
	<div
		class="pointer-events-none fixed rounded-full"
		style="
			left: {mx}px;
			top: {my}px;
			width: {click ? 3 : 5}px;
			height: {click ? 3 : 5}px;
			background: {hov ? '#E8003D' : 'white'};
			transform: translate(-50%,-50%);
			transition: width 0.08s, height 0.08s, background 0.15s;
			z-index: 99999;
			will-change: left, top;
		"
	></div>
{/if}
