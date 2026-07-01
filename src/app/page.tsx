'use client';

import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatisticsSection from '@/components/StatisticsSection';
import ServerInfoSection from '@/components/ServerInfoSection';
import PartnersSection from '@/components/PartnersSection';
import TeamPreview from '@/components/TeamPreview';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatisticsSection />
      <ServerInfoSection />
      <PartnersSection />
      <TeamPreview />
    </>
  );
}
