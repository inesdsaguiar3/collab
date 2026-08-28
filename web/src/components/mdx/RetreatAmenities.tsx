const SPACE_FEATURES = [
  "Spacious indoor & outdoor areas",
  "Dedicated co-working spaces with high-speed WiFi",
  "Peaceful garden corners and meditation spots",
  "Pool, lounge areas and communal kitchen",
  "Filtered water and sustainable lifestyle practices",
  "Room to host your own circles, sessions or creative offerings",
];

interface RetreatAmenitiesProps {
  title?: string;
  accentColor?: string;
  imageSrc?: string;
}

export function RetreatAmenities({
  title = "Spaces & amenities",
  accentColor = "#EB8064",
  imageSrc = "/images/sunlounge.jpeg",
}: RetreatAmenitiesProps) {
  return (
    <div className="space-y-12 md:space-y-14">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div>
          <p
            className="text-[0.68rem] uppercase tracking-[0.45em] mb-2.5 font-normal"
            style={{ color: accentColor }}
          >
            The house
          </p>
          <h2
            className="text-[clamp(1.5rem,3vw,2.25rem)] font-light tracking-tight m-0 leading-tight mb-6"
            style={{ color: "#2E2440" }}
          >
            {title}
          </h2>
          <ul className="space-y-3 m-0 p-0 list-none">
            {SPACE_FEATURES.map((item) => (
              <li key={item} className="flex items-start gap-3 font-light text-base leading-[1.7]">
                <span
                  className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: accentColor }}
                />
                <span style={{ color: "#4A3F5C" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src={imageSrc}
            alt="Casa do Sol spaces"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src="/images/twin.JPG"
            alt="Shared room at Casa do Sol"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img
            src="/images/queen-balcony.png"
            alt="Private room at Casa do Sol"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
