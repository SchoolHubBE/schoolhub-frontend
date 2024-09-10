'use client';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react"
import { Navbar } from '@/components/navbar/navbar';
import { format } from 'date-fns'

export default function DarkSchedule() {
    const [currentDate, setCurrentDate] = useState(new Date())

    const events = [
        { id: 1, title: "ICW - Software ontwikkelen", time: "08:30-09:20", color: "bg-blue-600" },
        { id: 2, title: "Engels", time: "09:20-10:10", color: "bg-green-600" },
        { id: 3, title: "Wiskunde", time: "10:10-11:00", color: "bg-red-600" },
        { id: 4, title: "LO", time: "11:10-12:00", color: "bg-purple-600" },
        { id: 5, title: "Frans", time: "12:00-12:50", color: "bg-yellow-600" },
    ]

    const [todos, setTodos] = useState([
        { id: 1, title: "Kennismaking", completed: true },
        { id: 2, title: "Laptop meenemen", completed: false },
    ])

    const navigate = (offset: number) => {
        setCurrentDate(new Date(currentDate.getTime() + offset * 24 * 60 * 60 * 1000))
    }

    const handleTodoChange = (id: number) => {
        console.log(`Todo with ID ${id} was clicked`)
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <header className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">Mijn planner</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="text-lg font-medium">{format(currentDate, 'd MMMM yyyy')}</span>
                    <Button variant="outline" size="icon" onClick={() => navigate(1)}><ChevronRight className="h-4 w-4" /></Button>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2 bg-gray-800 border-gray-700 p-4 text-white">
                    <CardHeader>
                        <CardTitle>Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-5 gap-2">
                            {['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'].map((day, index) => (
                                <div key={day} className="text-center">
                                    <div className="font-medium">{day}</div>
                                    <div className="text-sm text-gray-400">{format(new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000), 'd')}</div>
                                    <div className="mt-2 space-y-2">
                                        {events.map(event => (
                                            <div key={event.id} className={`${event.color} p-2 rounded text-xs`}>
                                                <div className="font-medium">{event.title}</div>
                                                <div>{event.time}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700 p-4 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle>To-Do</CardTitle>
                        <Button size="sm" variant="ghost">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Task
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {todos.map((todo) => (
                                <li key={todo.id} className="flex items-center space-x-2">
                                    <input type="checkbox" checked={todo.completed} onChange={() => handleTodoChange(todo.id)} className="rounded border-gray-600 text-blue-600 focus:ring-blue-600" />
                                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.title}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

