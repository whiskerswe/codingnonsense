import image3 from '../../assets/images/chapters/book3.jpg';

const defaultImage = image3;

const modules = import.meta.glob(
	"../../assets/images/**/*.{jpg,jpeg,png,webp,svg}",
	{
		eager: true,
		import: "default"
	}
);

export type ImageKey = keyof typeof imageRegistry;

export const imageRegistry: Record<string, string> =
	Object.entries(modules).reduce((acc, [path, src]) => {
		const fileName = path.split("/").pop();
		if (!fileName) return acc;
		
		const key = fileName.replace(/\.[^/.]+$/, ""); // remove extension
		acc[key] = src as string;
		
		return acc;
	}, {} as Record<string, string>);

export function resolveImage(
	key?: string
): string | undefined {
	console.log("imageRegistry KEY:", key);
	console.log("imageRegistry:", imageRegistry);
	if (!key) return defaultImage;
	const normalizedKey = key.replace(/\.[^/.]+$/, "");
	console.log("normalized KEY:", normalizedKey);
	return imageRegistry[normalizedKey] ?? defaultImage;
}
