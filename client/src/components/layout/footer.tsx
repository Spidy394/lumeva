import React from 'react'
import Link from 'next/link'
import { NextURL } from 'next/dist/server/web/next-url'
import { BsInstagram } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { BsLinkedin } from 'react-icons/bs'

export default function Footer() {
  return (
    <footer className="bg-violet-400 text-shadow-white z-50">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-7 md:grid-cols-3">
        <div>
          <img src="/logo.svg" alt="Product Logo" className="w-30 h-auto" />
          <span className="text-xl md:text-2xl font-semibold tracking-tight text-white">  Lumeva</span>
        </div>

        <div className="flex flex-col gap-3 ">
          <h3 className="text-white font-large text-xl">Explore</h3>
          <Link href="" className="hover:text-violet-900 transition cursor-pointer">About Us</Link>
          <Link href="" className="hover:text-violet-900 transition cursor-pointer">Contact Us</Link>
          <Link href="" className="hover:text-violet-900 transition cursor-pointer">Privacy Policy</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-white font-medium text-xl">Connect</h3>
          <div className="flex flex-row gap-5">
          <a href="" className="hover:text-violet-900 text-2xl transition"><BsInstagram /></a>
          <a href="" className="hover:text-violet-900 text-2xl transition"><MdEmail /></a>
          <a href="" className="hover:text-violet-900 text-2xl transition"><BsLinkedin /></a>
            </div>
        </div>


      </div>

      <div className="border-t border-violet-500 text-center py-5 text-sm text-white font-medium">
        © 2026 Lumeva. All rights reserved.
      </div>
    </footer>
  )
}
