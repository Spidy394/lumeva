"use client";
import Image from "next/image";
import CardNav from "../ui/cardnav";

type NavLink = {
  label: string;
  ariaLabel: string;
};

type NavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
};

const navItems: NavItem[] = [
  {
    label: "About",
    bgColor: "#F5F3FF", // soft violet background
    textColor: "#4C1D95", // deep violet text
    links: [
      { label: "Company", ariaLabel: "About Company" },
      { label: "Careers", ariaLabel: "About Careers" }
    ]
  },
  {
    label: "Projects",
    bgColor: "#FDF4FF", // soft pink tint
    textColor: "#86198F", // magenta tone
    links: [
      { label: "Featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies" }
    ]
  },
  {
    label: "Contact",
    bgColor: "#EEF2FF", // soft indigo tint
    textColor: "#3730A3",
    links: [
      { label: "Email", ariaLabel: "Email us" },
      { label: "Twitter", ariaLabel: "Twitter" },
      { label: "LinkedIn", ariaLabel: "LinkedIn" }
    ]
  }
];

export default function MainNav() {
  return (
    <CardNav
  logoAlt="Lumeva Logo"
  logo="/Lumeva.svg"
  items={navItems}
  baseColor="white"   // glass base
  menuColor="#111827"                 // neutral dark gray
  buttonBgColor="#4C1D95"             // deep violet
  buttonTextColor="#ffffff"
  ease="power3.out"
  theme="light"
/>
  );
}