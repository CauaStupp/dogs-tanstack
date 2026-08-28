import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type ThemeType = "dark" | "light" | "system";

type ThemeContextProps = {
	theme: ThemeType;
	toggleTheme: (theme: ThemeType) => void;
};

type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: ThemeType;
	storageKey?: string;
};

const initialState: ThemeContextProps = {
	theme: "system",
	toggleTheme: () => null,
};

const ThemeContext = createContext<ThemeContextProps>(initialState);

export function ThemeContextProvider({
	children,
	defaultTheme = "system",
	storageKey = "theme",
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<ThemeType>(() => {
		if (typeof window === "undefined") return defaultTheme;
		return (localStorage.getItem(storageKey) as ThemeType) || defaultTheme;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-colors-scheme: dark)")
				.matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	useEffect(() => {
		if (theme !== "system") return;

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const listener = () => {
			const root = window.document.documentElement;
			root.classList.remove("light", "dark");
			root.classList.add(media.matches ? "dark" : "light");
		};

		media.addEventListener("change", listener);
		return () => media.removeEventListener("change", listener);
	}, [theme]);

	const toggleTheme = (theme: ThemeType) => {
		localStorage.setItem(storageKey, theme);
		setTheme(theme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("ThemeProvider precisa estar definido");
	}
	return context;
}
