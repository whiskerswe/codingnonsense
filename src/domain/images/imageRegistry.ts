import image3 from '../../assets/images/chapters/book3.webp';

const defaultImage = image3;

const modules = import.meta.glob(
	"../../assets/images/**/*.{jpg,jpeg,png,webp,svg}",
	{
		import: "default"
	}
);

export type ImageKey = keyof typeof imageRegistry;

export const imageRegistry: Record<string, () => Promise<string>> =
	Object.entries(modules).reduce((acc, [path, loader]) => {
		const fileName = path.split("/").pop();
		if (!fileName) return acc;
		
		const key = fileName.replace(/\.[^/.]+$/, "");
		acc[key] = loader as () => Promise<string>;
		
		return acc;
	}, {} as Record<string, () => Promise<string>>);

const cache = new Map<string, string>();

export async function resolveImage(key: string): Promise<string> {
	const normalizedKey = key.replace(/\.[^/.]+$/, "");
	
	if (cache.has(normalizedKey)) {
		return cache.get(normalizedKey)!;
	}
	
	const loader = imageRegistry[normalizedKey];
	if (!loader) return defaultImage;
	
	const src = await loader();
	cache.set(normalizedKey, src);
	
	return src;
}