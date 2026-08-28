import { useEffect, useRef } from "react";

export function LoadTrigger({
	onIntersect,
	disabled,
}: {
	onIntersect: () => void;
	disabled?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !disabled) {
					onIntersect();
				}
			},
			{ rootMargin: "100px" }, // dispara 300px antes de chegar no elemento
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [onIntersect, disabled]);

	return <div ref={ref} className="h-1" />;
}
