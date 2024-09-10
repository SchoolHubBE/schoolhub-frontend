'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Calendar, FileText, Home, Info, Mail, Menu, Search, Settings, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { fetchCourses } from "@/lib/api"

interface NavItem {
    href: string
    icon: React.ElementType
    label: string
}

interface Course {
    id: number
    name: string
}

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const pathname = usePathname()

    const navItems: NavItem[] = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/schedule', icon: Calendar, label: 'Schedule' },
        { href: '/resources', icon: Info, label: 'Resources' },
    ]

    return (
        <header className="bg-primary text-primary-foreground shadow-md">
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-2xl font-bold">
                            <span>{process.env.INSTANCE_NAME || 'SchoolHub | Unnamed Instance'}</span>
                        </Link>
                        <div className="hidden md:flex space-x-2">
                            {navItems.map((item) => (
                                <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                            ))}
                            <CoursesPopover />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SearchBar isVisible={isSearchVisible} setIsVisible={setIsSearchVisible} />
                        <div className="hidden md:flex space-x-2">
                            <IconButton icon={Mail} label="Messages" />
                            <IconButton icon={Bell} label="Notifications" />
                            <IconButton icon={Settings} label="Settings" />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </nav>
            </div>
            {isMenuOpen && (
                <MobileMenu navItems={navItems} pathname={pathname} setIsMenuOpen={setIsMenuOpen} />
            )}
        </header>
    )
}

function NavItem({ href, icon: Icon, label, isActive }: NavItem & { isActive: boolean }) {
    return (
        <Link href={href} passHref legacyBehavior>
            <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`text-primary-foreground ${isActive ? 'bg-primary-foreground/10' : ''}`}
                asChild
            >
                <a>
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                </a>
            </Button>
        </Link>
    )
}

function CoursesPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="text-primary-foreground">
                    <FileText className="mr-2 h-4 w-4" />
                    Courses
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
                <CoursesList />
            </PopoverContent>
        </Popover>
    )
}

function CoursesList() {
    const [courses, setCourses] = useState<Course[] | null>(null)

    useEffect(() => {
        fetchCourses().then(setCourses).catch(() => setCourses([]))
    }, [])

    if (!courses) {
        return <div className="p-4"><Skeleton className="h-[120px] w-full" /></div>
    }

    return (
        <ul className="max-h-[300px] overflow-auto py-2">
            {courses.map((course) => (
                <li key={course.id}>
                    <Link
                        href={`/courses/${course.id}`}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                    >
                        <FileText className="h-4 w-4" />
                        <span>{course.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

interface SearchBarProps {
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
}

function SearchBar({ isVisible, setIsVisible }: SearchBarProps) {
    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground"
                onClick={() => setIsVisible(!isVisible)}
                aria-label={isVisible ? "Close search" : "Open search"}
            >
                <Search className="h-5 w-5" />
            </Button>
            {isVisible && (
                <form className="absolute right-0 top-full mt-2 animate-in slide-in-from-top-1 duration-200">
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-64"
                        autoFocus
                    />
                </form>
            )}
        </div>
    )
}

interface IconButtonProps {
    icon: React.ElementType
    label: string
}

function IconButton({ icon: Icon, label }: IconButtonProps) {
    return (
        <Button variant="ghost" size="icon" className="text-primary-foreground" aria-label={label}>
            <Icon className="h-5 w-5" />
        </Button>
    )
}

interface MobileMenuProps {
    navItems: NavItem[]
    pathname: string
    setIsMenuOpen: (isOpen: boolean) => void
}

function MobileMenu({ navItems, pathname, setIsMenuOpen }: MobileMenuProps) {
    return (
        <div className="md:hidden bg-primary-foreground text-primary p-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                    <NavItem key={item.href} {...item} isActive={pathname === item.href} />
                ))}
                <CoursesPopover />
                <IconButton icon={Mail} label="Messages" />
                <IconButton icon={Bell} label="Notifications" />
                <IconButton icon={Settings} label="Settings" />
            </nav>
        </div>
    )
}

