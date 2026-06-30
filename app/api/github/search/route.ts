import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { createGitHubClient } from "@/lib/github";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ items: [] });
  }

  const github = createGitHubClient(session.accessToken as string);

  try {
    const [users, repos] = await Promise.allSettled([
      github.searchUsers(query, { perPage: 5 }),
      github.searchRepositories(query, { perPage: 5 }),
    ]);

    const items = [];

    if (users.status === "fulfilled") {
      for (const user of users.value.items) {
        items.push({
          type: user.type === "Organization" ? "organization" : "user",
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          description: user.bio,
        });
      }
    }

    if (repos.status === "fulfilled") {
      for (const repo of repos.value.items) {
        items.push({
          type: "repository",
          id: repo.id,
          full_name: repo.full_name,
          avatar_url: repo.owner.avatar_url,
          html_url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
        });
      }
    }

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ items: [] });
  }
}
