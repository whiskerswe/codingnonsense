const modules = import.meta.glob(
	"../assets/tenniel/*.jpg",
	{
		eager: true,
		import: "default",
	}
);

export const tennielImages: Record<string, string> =
	Object.entries(modules).reduce<Record<string, string>>(
		(acc, [path, src]) => {
			const match = path.match(/([^/]+)\.jpg$/);
			if (!match) return acc;
			const id = match[1]; // t.ex. "book1"
			acc[id] = src as string;
			return acc;
		},
		{}
	);
