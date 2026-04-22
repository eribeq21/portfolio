/**
 * Svelte action: fade-up reveal on scroll into view.
 * Usage: <div use:reveal> or <div use:reveal={{ delay: 150, y: 48 }}>
 */
export function reveal(node, { delay = 0, y = 36, x = 0 } = {}) {
	// Hide with inline style immediately (before any paint)
	node.style.opacity = '0';
	node.style.transform = `translate(${x}px, ${y}px)`;
	node.style.transition = 'none';

	const io = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				requestAnimationFrame(() => {
					node.style.transition = `opacity 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1), transform 0.7s ${delay}ms cubic-bezier(0.16,1,0.3,1)`;
					node.style.opacity = '1';
					node.style.transform = 'translate(0,0)';
				});
				io.disconnect();
			}
		},
		{ threshold: 0.01, rootMargin: '0px' }
	);

	setTimeout(() => io.observe(node), 50);

	return { destroy: () => io.disconnect() };
}

