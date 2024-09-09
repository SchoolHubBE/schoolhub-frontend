'use client';

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { Bell, Calendar, FileText, Home, Info, Mail, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { fetchCourses } from "@/lib/api";

export async function Navbar() {
    const [searchVisible, setSearchVisible] = useState(false)

    const courses = await fetchCourses()

    return (
        <header className="bg-blue-600 text-white p-4">
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-2xl font-bold">
                        {/* {process.env.INSTANCE_NAME} TODO: this generates an SSR error because the client doesn't have that environment variable */}
                        <span className="sr-only">SchoolHub</span>
                    </Link>
                    <Button variant="ghost" className="text-white">
                        <Home className="mr-2 h-4 w-4" />
                        Home
                    </Button>
                    <Button variant="ghost" className="text-white">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="text-white">
                                <FileText className="mr-2 h-4 w-4" />
                                Courses
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-[200px]">
                            <ul className="space-y-1 p-2">
                                {courses?.map(course => (
                                    <li key={course.id}>
                                        <Link href={`/courses/${course.id}`} className="flex items-center space-x-2">
                                            <FileText className="h-4 w-4" />
                                            <span>{course.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </PopoverContent>
                    </Popover>
                    <Button variant="ghost" className="text-white">
                        <Info className="mr-2 h-4 w-4" />
                        Resources
                    </Button>
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        className="text-white"
                        onClick={() => setSearchVisible(!searchVisible)}
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                    <form className={searchVisible ? "animate-slide-in" : "animate-slide-out"}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none px-2 py-1"
                        />
                    </form>
                    <Button variant="ghost" className="text-white">
                        <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="text-white">
                        <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="text-white">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </nav>
        </header>
    )
}

