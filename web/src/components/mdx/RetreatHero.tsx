import Image from "next/image";

interface RetreatHeroProps {
  title: string;
  subtitle?: string;
  date: string;
  location?: string;
  imageUrl?: string;
  videoUrl?: string;
  accentColor?: string;
  hideImage?: boolean;
}

export function RetreatHero({
  title, subtitle, date, location, imageUrl, videoUrl,
  accentColor = "#7F5AA1", hideImage = false,
}: RetreatHeroProps) {

  if (videoUrl) {
    return (
      <section className="relative h-[80vh] min-h-[500px] flex items-end justify-center overflow-hidden">
        <video autoPlay loop muted playsInline src={videoUrl}
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        <div className="relative z-20 text-left px-10 pb-16 w-full max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-4">
            {date}{location ? ` · ${location}` : ""}
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight">{title}</h1>
          {subtitle && <p className="mt-4 text-lg font-light text-white/60 max-w-md leading-relaxed">{subtitle}</p>}
        </div>
      </section>
    );
  }

  /* Text-only hero */
  if (hideImage) {
    return (
      <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/45">
            {date}{location ? ` · ${location}` : ""}
          </p>
          <h1 style={{ lineHeight: "1.05" }}
            className="text-5xl md:text-6xl lg:text-[5.5rem] font-light text-white tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/55 font-light max-w-lg mx-auto leading-[1.8]">
              {subtitle}
            </p>
          )}
          <div className="inline-block h-px w-20 mt-4 rounded-full"
            style={{ background: "linear-gradient(to right, #EB806460, #7F5AA160)" }} />
        </div>
      </section>
    );
  }

  /* Image hero */
  return (
    <section className="relative h-[75vh] min-h-[500px] flex items-end justify-start overflow-hidden">
      {imageUrl && (
        <Image src={imageUrl} fill sizes="100vw" style={{ objectFit: "cover" }} alt={title} className="z-0" priority />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
      <div className="relative z-20 px-10 pb-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-4">
          {date}{location ? ` · ${location}` : ""}
        </p>
        <h1 className="text-5xl md:text-6xl font-light text-white leading-[1.05] tracking-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg font-light text-white/60 max-w-md leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
