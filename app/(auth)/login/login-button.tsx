"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { signIn } from "@/lib/auth-client";

export function LoginButton() {
  return (
    <Button
      onClick={() => signIn("github")}
      className="w-full h-9 gap-2"
      size="lg"
    >
      <GithubIcon className="size-4" />
      Continue with GitHub
    </Button>
  );
}
