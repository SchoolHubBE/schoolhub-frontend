import { cache } from 'react'
import { useQuery } from 'react-query'

export interface PlatformEvent {
    id: number
    name: string
}

export interface PlatformAnnouncement {
    id: number
    title: string
    description: string
    href: string
}

export interface PlatformQuickLink {
    id: number
    name: string
    description: string
    url: string
}

export interface Course {
    id: number
    name: string
    href: string
}

const API_BASE_URL = `http://${process.env.API_PUBLIC_DOMAIN}/v1`

/**
 * Fetches a JSON response from the given URL and caches it.
 *
 * @param {string} url The URL to fetch from.
 * @returns {Promise<any>} The JSON parsed response.
 */
const fetchWithCache = cache(async (url: string) => {
    const res = await fetch(url)
    return res.json()
})

/**
 * Fetches the platform events from the API and caches them.
 *
 * @returns {Promise<PlatformEvent[]>} The list of platform events.
 */
export const fetchPlatformEvents = cache(async (): Promise<PlatformEvent[]> => {
    return []
})

/**
 * Fetches the platform announcements from the API and caches them.
 *
 * @returns {Promise<PlatformAnnouncement[]>} The list of platform announcements.
 */
export const fetchPlatformAnnouncements = cache(
    async (): Promise<PlatformAnnouncement[]> => {
        const data = await fetchWithCache(
            `${API_BASE_URL}/platform-announcements`
        )
        return (data ?? []).map((announcement: any) => ({
            id: announcement.id,
            title: announcement.title,
            description: announcement.description,
            href: `/platform-announcements/${announcement.id}`,
        }))
    }
)

/**
 * Fetches the platform quick links from the API and caches them.
 *
 * @returns {Promise<PlatformQuickLink[]>} The list of platform quick links.
 */
export const fetchPlatformQuickLinks = cache(
    async (): Promise<PlatformQuickLink[]> => {
        const data = await fetchWithCache(
            `${API_BASE_URL}/platform-quick-links`
        )
        return (data ?? []).map((quickLink: any) => ({
            id: quickLink.id,
            name: quickLink.name,
            description: quickLink.description,
            url: quickLink.url,
        }))
    }
)

/**
 * Fetches the courses from the API and caches them.
 *
 * @returns {Promise<Course[]>} The list of courses.
 */
export const fetchCourses = cache(async (): Promise<Course[]> => {
    const data = await fetchWithCache(`${API_BASE_URL}/courses`)
    return (data ?? []).map((course: any) => ({
        id: course.id,
        name: course.name,
        href: `/course/${course.id}`,
    }))
})

/**
 * Fetches a course topic, or the course itself if no topicName is specified.
 *
 * @param id The ID of the course.
 * @param topicName The name of the topic, or undefined to fetch the course itself.
 * @returns The course topic, or the course itself if the topicName is undefined.
 */
export const fetchCourseTopic = cache(async (
    id: number,
    topicName?: string,
): Promise<Course> => {
    const url = topicName
        ? `${API_BASE_URL}/courses/${id}/${topicName}`
        : `${API_BASE_URL}/courses/${id}`
    return fetchWithCache(url)
});

/**
 * Fetches all platform announcements from the API and stores them in the query cache.
 *
 * @returns The list of announcements, or an empty array if the fetch fails.
 */
export function usePlatformAnnouncements() {
    return useQuery('platformAnnouncements', fetchPlatformAnnouncements)
}

/**
 * Fetches all platform quick links from the API and stores them in the query cache.
 *
 * @returns The list of quick links, or an empty array if the fetch fails.
 */
export function usePlatformQuickLinks() {
    return useQuery('platformQuickLinks', fetchPlatformQuickLinks)
}

/**
 * Fetches all courses from the API and stores them in the query cache.
 *
 * @returns The list of courses, or an empty array if the fetch fails.
 */
export function useCourses() {
    return useQuery('courses', fetchCourses)
}

/**
 * Fetches a course topic, or the course itself if no topicName is specified.
 *
 * @param id The ID of the course.
 * @param topicName The name of the topic, or undefined to fetch the course itself.
 */
export function useCourseTopic(id: number, topicName?: string) {
    return useQuery(['courseTopic', id, topicName], () => fetchCourseTopic(id, topicName))
}

export type Message = {
    id: number;
    from: string;
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    content: string;
    date: string;
};

export const fetchMessages = cache(async (): Promise<Message[]> => {
    const data = await fetchWithCache(`${API_BASE_URL}/messages`)
    return (data ?? []).map((message: any) => ({
        id: message.id,
        from: message.from,
        to: message.to,
        cc: message.cc,
        bcc: message.bcc,
        subject: message.subject,
        content: message.content,
        date: message.date,
    }))
});

export const fetchMessage = cache(async (id: number): Promise<Message | null> => {
    const data = await fetchWithCache(`${API_BASE_URL}/messages/${id}`)
    return data ? {
        id: data.id,
        from: data.from,
        to: data.to,
        cc: data.cc,
        bcc: data.bcc,
        subject: data.subject,
        content: data.content,
        date: data.date,
    } : null
});

export type CreateMessageRequest = Omit<Message, 'id' | 'from' | 'date'>;

export const sendMessage = cache(async (newMessage: CreateMessageRequest): Promise<Message> => {
    const res = await fetch(`${API_BASE_URL}/messages`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage)
    })
    const data = await res.json()
    return {
        id: data.id,
        from: data.from,
        to: data.to,
        cc: data.cc,
        bcc: data.bcc,
        subject: data.subject,
        content: data.content,
        date: data.date,
    }
});
