import React from "react";
import type { MDXComponents } from "mdx/types";
import { RetreatHero } from "./RetreatHero";
import { RetreatSection, RetreatSectionTitle } from "./RetreatSection";
import { RetreatHost, RetreatHosts } from "./RetreatHost";
import { RetreatPricing, PricingOption } from "./RetreatPricing";
import { RetreatGallery, GalleryImage } from "./RetreatGallery";
import { RetreatVenue, VenueImage } from "./RetreatVenue";
import { RetreatCTA, FloatingCTA } from "./RetreatCTA";
import { RetreatBenefits, BenefitItem } from "./RetreatBenefits";
import { RetreatIsForYou, IsForYouItem } from "./RetreatIsForYou";
import { RetreatOverview, RetreatPractices, RetreatIncludes, OverviewPractice, OverviewIncludes } from "./RetreatOverview";
import { RetreatDisclaimer } from "./RetreatDisclaimer";
import { RetreatHighlight } from "./RetreatHighlight";
import { RetreatFullPhoto } from "./RetreatFullPhoto";
import { RetreatPhotoMosaic, MosaicImage } from "./RetreatPhotoMosaic";
import { RetreatFood, FoodImage } from "./RetreatFood";

// Colour tokens
const C_HEADING  = "#2E2440";
const C_H2       = "#7F5AA1";
const C_H3       = "#AE5F8F";
const C_BODY     = "#4A3F5C";
const C_MUTED    = "#7A6A8A";
const C_STRONG   = "#7F5AA1";
const C_BULLET   = "#AE5F8F80";

export const mdxComponents: MDXComponents = {
  RetreatHero,
  RetreatSection,
  RetreatSectionTitle,
  RetreatHost,
  RetreatHosts,
  RetreatPricing,
  PricingOption,
  RetreatGallery,
  GalleryImage,
  RetreatVenue,
  VenueImage,
  RetreatCTA,
  FloatingCTA,
  RetreatBenefits,
  BenefitItem,
  RetreatIsForYou,
  IsForYouItem,
  RetreatOverview,
  RetreatPractices,
  RetreatIncludes,
  OverviewPractice,
  OverviewIncludes,
  RetreatDisclaimer,
  RetreatHighlight,
  RetreatFullPhoto,
  RetreatPhotoMosaic,
  MosaicImage,
  RetreatFood,
  FoodImage,

  // Prose elements
  p: (props) => (
    <p style={{ color: C_BODY, lineHeight: "1.9" }}
      className="mb-6 font-light text-base md:text-[1.05rem]" {...props} />
  ),
  h1: (props) => (
    <h1 style={{ color: C_HEADING }}
      className="text-3xl md:text-4xl font-light tracking-tight mb-8 mt-4" {...props} />
  ),
  h2: (props) => (
    <h2 style={{ color: C_H2 }}
      className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 mt-12" {...props} />
  ),
  h3: (props) => (
    <h3 style={{ color: C_H3 }}
      className="text-lg font-medium mb-4 mt-8 tracking-wide" {...props} />
  ),
  ul: (props) => (
    <ul style={{ color: C_BODY }} className="space-y-3 mb-6" {...props} />
  ),
  ol: (props) => (
    <ol style={{ color: C_BODY }} className="list-decimal list-inside space-y-3 mb-6" {...props} />
  ),
  li: (props) => (
    <li className="flex items-start gap-3 font-light text-base leading-[1.8]">
      <span className="mt-2.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: C_BULLET }} />
      <span style={{ color: C_BODY }} {...props} />
    </li>
  ),
  strong: (props) => (
    <strong style={{ color: C_STRONG }} className="font-semibold" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      style={{ borderLeft: "2px solid #EB806450", color: C_MUTED }}
      className="pl-5 italic my-8 font-light text-lg leading-[1.9]"
      {...props}
    />
  ),
};
