export interface Event {
    id: number
    name: string
}

export async function fetchEvents(): Promise<Event[]> {
    // return placeholder
    return []
}

export interface Announcement {
    id: number
    title: string
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
    // return placeholder
    return []
}

export interface QuickLink {
    id: number
    name: string
    url: string
}

export async function fetchQuickLinks(): Promise<QuickLink[]> {
    // return placeholder
    return []
}

export interface Course {
    id: number
    name: string
    href: string
}

export async function fetchCourses(): Promise<Course[]> {
    return [
        { id: 1, name: "Math", href: "/courses/1" },
        { id: 2, name: "Science", href: "/courses/2" },
        { id: 3, name: "English", href: "/courses/3" },
        { id: 4, name: "History", href: "/courses/4" },
    ]
}

