'use client';

import { useState } from 'react'
import { Navbar } from "@/components/navbar/navbar";
import { Star, FileText, Book, Link, CheckSquare, Activity, Upload, MessageSquare, PieChart, Edit } from 'lucide-react';

export default function Page({ params }: { params: { course_id: number } }) {
    const [selected, setSelected] = useState('Vaknieuws')
    const menuItems = [
        { icon: Star, label: 'Vaknieuws' },
        { icon: FileText, label: 'Documenten' },
        { icon: CheckSquare, label: 'Taken' },
        { icon: Activity, label: 'Oefeningen' },
        { icon: Upload, label: 'Uploadzone' },
        { icon: Link, label: 'Weblinks' },
        { icon: MessageSquare, label: 'Forum' },
        { icon: Edit, label: 'Wiki' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <div className="flex flex-1">
                <aside className="w-64 bg-gray-800 p-4">
                    <nav>
                        <ul className="space-y-2">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setSelected(item.label)}
                                        className={`flex items-center space-x-3 text-gray-500 p-2 rounded-lg font-medium ${selected === item.label ? 'bg-gray-950' : ''} focus:shadow-outline transition duration-300 ease-in-out`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-4">Course ID: {params.course_id}</h1>
                    {selected === 'Vaknieuws' && (
                        <p>Vaknieuws</p>
                    )}
                    {selected === 'Documenten' && (
                        <p>Documenten</p>
                    )}
                    {selected === 'Taken' && (
                        <p>Taken</p>
                    )}
                    {selected === 'Oefeningen' && (
                        <p>Oefeningen</p>
                    )}
                    {selected === 'Uploadzone' && (
                        <p>Uploadzone</p>
                    )}
                    {selected === 'Weblinks' && (
                        <p>Weblinks</p>
                    )}
                    {selected === 'Forum' && (
                        <p>Forum</p>
                    )}
                    {selected === 'Wiki' && (
                        <p>Wiki</p>
                    )}
                </main>
            </div>
        </div>
    )
}

