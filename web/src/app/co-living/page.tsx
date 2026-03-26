"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Sparkles, CircleCheck } from "lucide-react";

const values = [
  { title: "Co-creation", desc: "Building together with shared intention and contribution." },
  { title: "Expansion", desc: "Growing beyond comfort while staying grounded in care." },
  { title: "Community", desc: "Choosing belonging, mutual support and collective wellbeing." },
  { title: "Social awareness", desc: "Staying attentive to impact, privilege and responsibility." },
  { title: "Connection", desc: "Reconnecting to self, others and what truly matters." },
  { title: "Expression", desc: "Making space for creativity, voice, movement and truth." },
  { title: "Communication", desc: "Listening deeply and speaking honestly with kindness." },
  { title: "Authenticity", desc: "Showing up as we are, not as who we think we should be." },
];

const whatYouDoHere = [
  "One free pre-organised activity each day.",
  "Option to join regular classes based on our live calendar.",
  "A daily morning circle and check-in to ground and connect.",
  "A welcoming space to share your gifts: workshops, practices, or creative facilitation on a gift basis.",
  "Daily participation in community life: cooking, light upkeep, and care for shared spaces.",
  "Time to relax, create, explore nature, and enjoy life by the sea.",
];

const spaceFeatures = [
  "Spacious indoor & outdoor areas",
  "Dedicated co-working spaces with high-speed WiFi",
  "Peaceful garden corners and meditation spots",
  "Pool, lounge areas and communal kitchen",
  "Filtered water and sustainable lifestyle practices",
  "Room to host your own circles, sessions or creative offerings",
];

const practices = [
  "Daily movement and embodiment sessions",
  "Breathwork and meditation",
  "Community circles and co-creation labs",
  "Creative expression and workshops",
  "Optional surf and nature-based activities",
  "Included evening practice",
];

const futureOptions = [
  {
    name: "Ericeira, Portugal",
    status: "Future option",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85",
    description: "Ocean-side chapter with surf culture, movement, and creative living by the Atlantic.",
  },
  {
    name: "Lisbon, Portugal",
    status: "Future option",
    image: "https://images.unsplash.com/photo-1513735492246-483525079686?w=900&q=85",
    description: "City-based community experience for creators who want culture, connection, and flow.",
  },
  {
    name: "& more",
    status: "Future option",
    image: "/images/retreats/dsc_4366.jpg",
    description: "New co-living homes in development as the community keeps growing.",
  },
];

export default function CoLivingPage() {
  return (
    <div className="px-6 py-20 space-y-20">
      <section className="max-w-5xl mx-auto text-center space-y-6 pt-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold">Co-Living</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none">
          Co-living in Óbidos.<br />
          <span className="gradient-text">Live in community.</span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
          Right now, our active home is Casa do Sol in Óbidos. Ericeira, Lisbon and more options stay in our roadmap as future chapters.
        </p>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="relative h-[360px] md:h-[520px] overflow-hidden">
          <img src="/images/casa.jpg" alt="Casa do Sol in Óbidos" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
            <p className="text-3xl md:text-5xl font-black text-white mt-1">Casa do Sol, Óbidos</p>
            <p className="text-white/75 mt-2 max-w-2xl">
              A short-term immersion in community living, co-creation, focused work and real connection.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-12 px-8 md:px-12" style={{ background: "rgba(220, 210, 240, 0.2)" }}>
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Join our community</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              A short-term immersion<br />
              in community living.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
              Co-living, co-creating, giving and receiving — with dedicated time to work, grow, connect, and be nourished by life in community.
            </p>
          </div>

          <div className="space-y-5">
            <div className="pt-1">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55 mb-2">Dates</p>
              <div className="space-y-2 pl-0">
                <p className="text-white text-lg font-semibold flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> 1st May to 20th May 2026
                </p>
                <p className="text-white text-lg font-semibold flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 opacity-0" /> 10th to 18th October 2026
                </p>
              </div>
            </div>
            <div className="h-px w-full bg-white/15" />
            <p className="text-white/70 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Óbidos, Portugal
            </p>
            <div className="pt-2">
              <p className="text-white/70 text-sm leading-relaxed">
                A short-term co-living immersion for 5 to 20 days focused on connection, co-creation and sustainable rhythm.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-2">
                Included: one daily pre-organised activity, morning circle, community participation, access to regular classes, and space to share your own offerings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="relative h-[320px] md:h-[430px] overflow-hidden">
          <img src="/images/retreats/dsc_4366.jpg" alt="Community life in Óbidos" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto space-y-6 text-white/70 leading-relaxed py-10 border-y border-white/10">
        <h3 className="text-3xl font-black text-white">Co-creation</h3>
        <div className="space-y-4 max-w-4xl">
          <p>
            Co-creation means bringing your <strong className="text-white font-semibold">unique gifts, creativity and energy</strong> to nurture togetherness and build community.
            <strong className="text-white font-semibold"> Freedom and responsibility</strong> go hand in hand here.
          </p>
          <p>
            Think of it as an orchestra: we provide the rhythm and shared structure, and each person brings their own tone, timing and expression.
            Together we create <strong className="text-white font-semibold">something alive that could never exist in solo</strong>.
          </p>
          <p>
            In practice, this means <strong className="text-white font-semibold">living, playing and working together</strong> in a caring environment.
            Everyone contributes to practical aspects of community life: cooking, caring for shared spaces, and supporting one another.
          </p>
          <p>
            We also invite you to share your creative gifts: <strong className="text-white font-semibold">lead a workshop, offer a practice, or test something</strong> you have always wanted to facilitate, on a gift basis.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto space-y-8 py-10">
        <h3 className="text-3xl font-black text-white">What does it mean?</h3>
        <div className="space-y-5 max-w-4xl">
          <p className="text-white/70 text-lg leading-relaxed">
            Join us for 5 to 20 days to connect with inspiring people, nurture your creativity, co-create, and immerse yourself in beautiful nature.
          </p>
          <ul className="space-y-3 text-white/70">
            {whatYouDoHere.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-relaxed">
                <CircleCheck className="w-4 h-4 mt-1 text-[#EB8064] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="inline-flex items-center gap-2 text-sm text-white/65 pt-1">
            <Sparkles className="w-4 h-4 text-[#D16678]" />
            Each day balances structure, freedom, and meaningful connection.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="w-full h-[300px] md:h-[420px]" style={{ display: "flex", gap: "3px" }}>
          <div style={{ flex: "1.4", overflow: "hidden" }}>
            <img src="/images/library.jpeg" alt="Co-living moment" className="w-full h-full object-cover" />
          </div>
          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "3px" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <img src="/images/INES-61.jpg" alt="Co-living moment" className="w-full h-full object-cover" style={{ objectPosition: "center 65%" }} />
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <img src="/images/retreats/IMG_8185.JPG" alt="Co-living moment" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="relative h-[300px] md:h-[420px] overflow-hidden">
          <img src="/images/retreats/DSC_4621.JPG" alt="Community gathering" className="w-full h-full object-cover" style={{ objectPosition: "center 65%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto space-y-6 py-10">
        <h3 className="text-3xl font-black text-white mb-8">Values</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {values.map((value) => (
            <div key={value.title} className="p-5" style={{ borderLeft: "1px solid rgba(255,255,255,0.2)" }}>
              <p className="text-white font-semibold">{value.title}</p>
              <p className="text-white/60 text-sm mt-1">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start text-white/70 py-10 border-t border-white/10">
        <div className="space-y-5">
          <h3 className="text-3xl font-black text-white">Spaces</h3>
          <div className="p-2">
            <ul className="space-y-2 list-disc pl-6">
              {spaceFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative h-[320px] overflow-hidden">
          <img src="/images/sunlounge.jpeg" alt="Casa do Sol spaces" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start text-white/70 py-10 border-t border-white/10">
        <div className="relative h-[320px] overflow-hidden md:order-1">
          <img src="/images/retreats/55.jpeg" alt="Practices at Casa do Sol" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
        <div className="space-y-5 md:order-2">
          <h3 className="text-3xl font-black text-white">Practices</h3>
          <div className="p-2">
            <ul className="space-y-2 list-disc pl-6">
              {practices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="relative h-[300px] md:h-[420px] overflow-hidden">
          <img src="/images/retreats/dsc_4346.jpg" alt="Future co-living visions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto space-y-8 text-white/70 py-10 border-y border-white/10">
        <h3 className="text-3xl font-black text-white">Prices</h3>
        <p className="text-white/60 max-w-3xl">
          Transparent pricing with a community-friendly sliding approach.
        </p>

        <div className="grid md:grid-cols-[1.35fr_1fr] gap-10 items-start">
          <div className="space-y-5">
            <h4 className="text-xl font-semibold text-white">Accommodation (per night)</h4>
            <div className="pt-2">
              <div className="flex items-center justify-between border-b border-white/10 py-2"><span className="text-white/75">Private room</span><span className="text-white font-semibold">50€</span></div>
              <div className="flex items-center justify-between border-b border-white/10 py-2"><span className="text-white/75">Shared room</span><span className="text-white font-semibold">30€</span></div>
              <div className="flex items-center justify-between py-2"><span className="text-white/75">Own van/tent</span><span className="text-white font-semibold">25€</span></div>
            </div>
            <div className="space-y-2 text-sm text-white/60 pt-2">
              <p>Min. stay is 4 nights / 5 days.</p>
              <p>If you are facing financial hardships, you can pay up to 5€ less per night.</p>
              <p>If you can support others, please pay up to 5€ more per night.</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">Food</h4>
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between border-b border-white/10 py-2"><span className="text-white/75">Per week</span><span className="text-white font-semibold">70€</span></div>
              <div className="flex items-center justify-between border-b border-white/10 py-2"><span className="text-white/75">Per day</span><span className="text-white font-semibold">15€</span></div>
              <div className="flex items-center justify-between py-2"><span className="text-white/75">Per meal</span><span className="text-white font-semibold">7€</span></div>
            </div>
            <p className="text-sm text-white/65 leading-relaxed pt-2">
              Meals are an optional add-on: nourishing plant-based food prepared in community, with seasonal ingredients and shared kitchen rituals.
            </p>
            <p className="text-sm text-white/65 leading-relaxed">
              Groceries are also available for self-cooking, including fruits, vegetables, grains, and other essentials.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-white/15" />

        <div className="space-y-3">
          <h4 className="text-xl font-semibold text-white">Other Costs</h4>
          <p className="text-white/65">Workshops are not included in the Community Experience base price, but they are offered with special prices and sliding scales.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto space-y-4 text-white/70 py-10">
        <h3 className="text-3xl font-black text-white">Accommodation</h3>
        <div className="space-y-3 max-w-4xl">
          <p>At Casa do Sol we currently offer both shared and private room options, with cozy shared spaces and quieter rooms for deeper rest.</p>
          <p>Room styles include shared rooms and private options (including balcony / ensuite), depending on availability and stay duration.</p>
        </div>
        <Link href="/retreats/inner-peace-portugal#join-now" className="inline-block text-[#EB8064] underline underline-offset-4">
          See current room options
        </Link>
      </section>

      <section className="max-w-5xl mx-auto text-center pb-4">
        <h3 className="text-3xl font-black text-white">Ready to join this chapter in Óbidos?</h3>
        <p className="text-white/60 max-w-2xl mx-auto mt-3">
          If you have visited before, are curious, or feel called to deeper community connection, we would love to hear from you.
        </p>
        <div className="mt-6">
          <Link href="/contact" className="px-7 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678]">
            Apply / Get in touch
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto space-y-8 pb-10">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D16678] font-semibold">Future options</span>
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-3">Ericeira, Lisbon & more</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {futureOptions.map((opt) => (
            <div key={opt.name} className="overflow-hidden" style={{ background: "rgba(220, 210, 240, 0.22)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="h-56">
                <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-2 text-left">
                <p className="text-white font-semibold">{opt.name}</p>
                <p className="text-[#D16678] text-xs uppercase tracking-[0.18em]">{opt.status}</p>
                <p className="text-white/55 text-sm">{opt.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/contact" className="text-white/70 underline underline-offset-4 hover:text-white">
            Want updates on upcoming locations? Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
