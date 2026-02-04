
import { HeroSection } from "@/components/features/HeroSection";
import { InfoSection } from "@/components/features/InfoSection";
import { NewsSection } from "@/components/features/NewsSection";
import { volumeService } from "@/lib/volumeService";
import { newsService } from "@/lib/newsService";

export default async function Home() {
  // Fetch data on the server
  const volumes = await volumeService.getAll(true);
  const news = await newsService.getAll(true);

  // Separate latest and recent volumes
  const latestVolume = volumes[0] || null;
  const recentVolumes = volumes.slice(1, 5);
  const featuredNews = news.slice(0, 3);

  return (
    <>
      <HeroSection latestVolume={latestVolume} recentVolumes={recentVolumes} />
      <InfoSection />
      <NewsSection news={featuredNews} />
    </>
  );
}
