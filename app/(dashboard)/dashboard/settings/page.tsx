import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/features/settings";
import { PageHeader } from "@/components/shared/section-header";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Customize your dashboard appearance and manage your connected accounts."
      />
      <SettingsForm user={session.user} />
    </div>
  );
}
