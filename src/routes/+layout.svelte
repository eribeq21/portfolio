<script>
	import './layout.css';
	import fav from '$lib/assets/fav.png';
	import Cursor from '$lib/components/Cursor.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={fav} />
</svelte:head>

<Cursor />
{@render children()}
