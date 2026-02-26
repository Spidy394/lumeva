"use client";

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
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Company", ariaLabel: "About Company" },
      { label: "Careers", ariaLabel: "About Careers" }
    ]
  },
  {
    label: "Projects",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies" }
    ]
  },
  {
    label: "Contact",
    bgColor: "#271E37",
    textColor: "#fff",
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
      items={navItems}
      baseColor="#ffffff"
      menuColor="#000000"
      buttonBgColor="#111111"
      buttonTextColor="#ffffff"
      ease="power3.out"
      theme="light"
    />
  );
}