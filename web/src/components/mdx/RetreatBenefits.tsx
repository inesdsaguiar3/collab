import { FiSun, FiHeart, FiRepeat, FiAward, FiBriefcase, FiUsers, FiHome } from "react-icons/fi";
import { TbBrain, TbYoga } from "react-icons/tb";
import { IconType } from "react-icons";
import { ReactNode } from "react";

const iconMap: Record<string, IconType> = {
  vitality: FiSun, energy: FiSun, consciousness: TbBrain, regulation: FiRepeat,
  peace: TbYoga, practice: FiHeart, support: FiUsers, healing: FiHeart,
  work: FiBriefcase, community: FiHome, self: TbYoga, clarity: TbBrain,
  toolkit: FiBriefcase, integration: FiRepeat, trust: FiHeart, manual: FiAward,
  award: FiAward, users: FiUsers, brain: TbBrain, briefcase: FiBriefcase, heart: FiHeart,
};

const ICON_COLORS = ["#AE5F8F", "#EB8064", "#7F5AA1", "#D16678", "#AE5F8F", "#EB8064"];

interface BenefitItemProps {
  icon?: string;
  title: string;
  description?: string;
  accentColor?: string;
  index?: number;
}

export function BenefitItem({ icon, title, description, index = 0 }: BenefitItemProps) {
  const IconComponent = icon ? iconMap[icon] : null;
  return (
    <div className="space-y-2 py-6 border-b last:border-0" style={{ borderColor: "#AE5F8F15" }}>
      {IconComponent && <div style={{ color: ICON_COLORS[index % ICON_COLORS.length] }}><IconComponent className="w-4 h-4" /></div>}
      <h3 className="font-semibold text-sm tracking-wide" style={{ color: "#4A3558" }}>{title}</h3>
      {description && <p className="text-sm leading-[1.75] font-light" style={{ color: "#7A6A8A" }}>{description}</p>}
    </div>
  );
}

interface RetreatBenefitsProps {
  title: string;
  accentColor?: string;
  children: ReactNode;
}

export function RetreatBenefits({ title, children }: RetreatBenefitsProps) {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] font-light" style={{ color: "#AE5F8F" }}>What you gain</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight" style={{ color: "#4A3558" }}>{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12">{children}</div>
    </div>
  );
}
