import { getRepoMeta } from "../api/repo";
import { buildInsights } from "../constants/insights";
import { AIExplainClient } from "./AIExplainClient";

export async function AIExplainForRepo({
  accessToken,
  owner,
  name,
}: {
  accessToken: string;
  owner: string;
  name: string;
}) {
  const meta = await getRepoMeta(accessToken, owner, name);
  const insights = buildInsights(meta);
  return <AIExplainClient name={name} insights={insights} />;
}
