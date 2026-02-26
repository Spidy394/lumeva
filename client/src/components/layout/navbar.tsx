"use client";
import Image from "next/image";
import CardNav from "../ui/cardnav";
import { CardNavItem } from '../ui/cardnav';

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

const navItems: CardNavItem[] = [
  {
    label: "About",
    bgColor: "#F5F3FF",
    textColor: "#4C1D95",
    links: [
      { 
        label: "About Us",
        ariaLabel: "About Us",
        href: "/about"
      },
    ]
  },
  {
    label: "Projects",
    bgColor: "#FDF4FF",
    textColor: "#86198F",
    links: [
      {
        label: "Featured",
        ariaLabel: "Featured Projects",
        href: "/projects/featured"
      },
      {
        label: "Case Studies",
        ariaLabel: "Project Case Studies",
        href: "/projects/case-studies"
      }
    ]
  },
  {
    label: "Contact",
    bgColor: "#EEF2FF",
    textColor: "#3730A3",
    links: [
      {
        label: "Email",
        ariaLabel: "Email us",
        href: "/contact/email"
      },
      {
        label: "Twitter",
        ariaLabel: "Twitter",
        href: "https://twitter.com"
      },
      {
        label: "LinkedIn",
        ariaLabel: "LinkedIn",
        href: "https://linkedin.com"
      }
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
/>
  );
}