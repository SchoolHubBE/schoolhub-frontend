'use client';

import { Navbar } from "@/components/navbar/navbar"
import { fetchPlatformEvents, fetchPlatformAnnouncements, fetchPlatformQuickLinks, PlatformEvent, PlatformAnnouncement, PlatformQuickLink } from "@/lib/api"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function Page() {
  const [platformEvents, setPlatformEvents] = useState<PlatformEvent[]>([])
  const [platformAnnouncements, setPlatformAnnouncements] = useState<PlatformAnnouncement[]>([])
  const [platformQuickLinks, setPlatformQuickLinks] = useState<PlatformQuickLink[]>([])

  useEffect(() => {
    fetchPlatformEvents().then(setPlatformEvents)
    fetchPlatformAnnouncements().then(setPlatformAnnouncements)
    fetchPlatformQuickLinks().then(setPlatformQuickLinks)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <section className="bg-[#333] p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <ul className="space-y-2">
                {platformEvents.map((event) => (
                  <li key={event.id}>{event.name}</li>
                ))}
              </ul>
            </section>
            <section className="bg-[#333] p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Recent Announcements</h2>
              <ul className="space-y-2">
                {platformAnnouncements.map((announcement) => (
                  <li key={announcement.id} className="flex flex-col">
                    <Link href={announcement.href} className="text-blue-600 hover:underline">
                      <h3 className="font-bold">{announcement.title}</h3>
                    </Link>
                    <p className="text-sm">{announcement.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="space-y-6">
            <section className="bg-[#333] p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                {platformQuickLinks.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url} target="_blank" className="text-blue-600 hover:underline">
                      {link.name}
                    </Link>
                    <p className="text-sm">{link.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

