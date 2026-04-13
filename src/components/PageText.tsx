import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
	body: string;
};

export default function PageText({ body }: Props) {
	return (
		<ReactMarkdown remarkPlugins={[remarkGfm]}>
			{body}
		</ReactMarkdown>
	);
}