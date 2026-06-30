import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileTextIcon, BookOpenIcon } from "lucide-react";
import { getReadme } from "../api/repositories";

export async function RepoReadme({
  accessToken,
  owner,
  name,
}: {
  accessToken: string;
  owner: string;
  name: string;
}) {
  const readme = await getReadme(accessToken, owner, name);

  if (!readme) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="flex flex-col items-center text-center">
            <BookOpenIcon className="size-8 text-[var(--color-fg-muted)] mb-2" />
            <p className="text-sm text-[var(--color-fg-muted)]">No README available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <FileTextIcon className="size-4 text-[var(--color-fg-muted)]" />
        <CardTitle>README.md</CardTitle>
        <a
          href={`https://github.com/${owner}/${name}#readme`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-[var(--color-fg-muted)] hover:text-[var(--color-accent-emphasis)]"
        >
          View raw
        </a>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none dark:prose-invert prose-headings:border-b prose-headings:border-[var(--color-border-muted)] prose-a:text-[var(--color-accent-emphasis)] prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
