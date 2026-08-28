import { render } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { ButtonIconSkeleton } from "./ButtonIconSkeleton";

describe("button", () => {
	it("render with keys", () => {
		const { container } = render(
			createElement(ButtonIconSkeleton, { count: 2 }),
		);

		expect(container.firstChild).not.toBeNull();
	});
});
