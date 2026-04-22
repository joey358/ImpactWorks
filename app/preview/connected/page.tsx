import ConnectedCommunityHero from "@/components/ConnectedCommunityHero";
import HomeLightSections from "@/components/HomeLightSections";

export default function ConnectedPreview() {
  return (
    <div>
      <ConnectedCommunityHero />
      {/* Stats are baked into the hero horizon band — skip the standalone stats section here */}
      <HomeLightSections hideStats />
    </div>
  );
}
