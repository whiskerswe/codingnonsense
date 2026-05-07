import image3 from '../../assets/images/chapters/book3.webp';

const defaultImage = image3;

const modules = import.meta.glob(
	"../../assets/images/**/*.{jpg,jpeg,png,webp,svg}",
	{ eager: true, import: "default" }
) as Record<string, string>;

export const imageRegistry = Object.fromEntries(
	Object.entries(modules).map(([path, src]) => {
		const fileName = path.split("/").pop()!;
		const key = fileName.replace(/\.[^/.]+$/, "");
		return [key, src];
	})
) as Record<string, string>;

export function resolveImage(key: string): string {
	return imageRegistry[key] ?? defaultImage;
}