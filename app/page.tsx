import { Navbar } from "@/components/navbar/navbar"
import { fetchEvents, fetchAnnouncements, fetchQuickLinks } from "@/lib/api"
import Link from "next/link"

export default async function Page() {
  const events = await fetchEvents()
  const announcements = await fetchAnnouncements()
  const quickLinks = await fetchQuickLinks()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <section className="bg-[#333] p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <ul className="space-y-2">
                {events.map((event) => (
                  <li key={event.id}>{event.name}</li>
                ))}
              </ul>
            </section>
            <section className="bg-[#333] p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Recent Announcements</h2>
              <ul className="space-y-2">
                {announcements.map((announcement) => (
                  <li key={announcement.id}>{announcement.title}</li>
                ))}
              </ul>
            </section>
          </div>
          <div className="space-y-6">
            <section className="bg-[#333] p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url} className="text-blue-600 hover:underline">
                      {link.name}
                    </Link>
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

