import { CountdownTimer } from "@/components/layout/CountdownTimer";
import { HeroSection } from "@/components/sections/HeroSection";
import { LoveMessage } from "@/components/sections/LoveMessage";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { HOME_THEMES, LOVE_MESSAGE, WEDDING_DATE } from "@/lib/constants";
import { getTimeLeft } from "@/lib/countdown";
import { getServerNow } from "@/lib/server-time";

export default async function HomePage() {
  const initialCountdown = getTimeLeft(WEDDING_DATE, await getServerNow());

  return (
    <div className="space-y-24 pb-24">
      <HeroSection />
      <section className="page-shell">
        <div className="ornate-panel p-8 md:p-12">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div>
              <p className="eyebrow">Contagem Regressiva</p>
              <h2 className="font-display text-4xl italic md:text-5xl">
                Para o dia mais especial
              </h2>
            </div>
            <div className="hidden gap-2 md:flex">
              {HOME_THEMES.map((theme) => (
                <div
                  key={theme.id}
                  className="h-10 w-10 border border-[var(--color-gold-muted)]"
                  style={{ background: theme.preview }}
                  title={theme.name}
                />
              ))}
            </div>
          </div>
          <CountdownTimer targetDate={WEDDING_DATE} initialTime={initialCountdown} />
        </div>
      </section>
      <StoryTimeline />
      <LoveMessage message={LOVE_MESSAGE} />
    </div>
  );
}
