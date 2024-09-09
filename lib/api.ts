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

export function fetchCourses(): Promise<Course[]> {
    return fetch(`http://${process.env.API_PUBLIC_DOMAIN}/v1/courses`)
        .then(response => response.json() as Promise<{ id: number, name: string }[]>)
        .then(json => (json ?? []).map(course => ({
            id: course.id,
            name: course.name,
            href: `/course/${course.id}`,
        })))
}
