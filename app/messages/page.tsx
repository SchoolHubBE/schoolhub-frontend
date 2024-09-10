'use client'

import { useState, useEffect } from 'react'
import { Mail, Inbox, Send, Trash, Search, RefreshCw, Plus, Reply, Forward, Printer, MoreVertical, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { CreateMessageRequest, fetchMessages, Message, sendMessage } from '@/lib/api'

export default function MessageClient() {
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
    const [isComposing, setIsComposing] = useState(false)
    const [newMessage, setNewMessage] = useState<Partial<Message>>({
        from: 'me@example.com',
        to: [],
        cc: [],
        bcc: [],
        subject: '',
        content: ''
    })

    useEffect(() => {
        fetchMessages().then(setMessages)
        if (messages.length > 0) {
            setSelectedMessage(messages[0])
        }
    }, [])

    const handleMessageSelect = (message: Message) => {
        setSelectedMessage(message)
    }

    const handleRefresh = () => {
        fetchMessages().then(setMessages)
    }

    const handleCompose = () => {
        setIsComposing(true)
        setSelectedMessage(null)
    }

    const handleReply = () => {
        if (selectedMessage) {
            setIsComposing(true)
            setNewMessage({
                from: 'me@example.com',
                to: [selectedMessage.from],
                cc: [],
                bcc: [],
                subject: `Re: ${selectedMessage.subject}`,
                content: `\n\nOn ${selectedMessage.date}, ${selectedMessage.from} wrote:\n\n${selectedMessage.content}`
            })
        }
    }

    const handleForward = () => {
        if (selectedMessage) {
            setIsComposing(true)
            setNewMessage({
                from: 'me@example.com',
                to: [],
                cc: [],
                bcc: [],
                subject: `Fwd: ${selectedMessage.subject}`,
                content: `\n\n-------- Forwarded Message --------\nFrom: ${selectedMessage.from}\nDate: ${selectedMessage.date}\nSubject: ${selectedMessage.subject}\n\n${selectedMessage.content}`
            })
        }
    }

    const handleDelete = () => {
        if (selectedMessage) {
            setMessages(messages.filter(message => message.id !== selectedMessage.id))
            setSelectedMessage(messages.length > 1 ? messages[0] : null)
        }
    }

    const handlePrint = () => {
        if (selectedMessage) {
            window.print()
        }
    }

    const handleSend = () => {
        sendMessage(newMessage as CreateMessageRequest).then(sentMessage => {
            setMessages([sentMessage, ...messages])
            setIsComposing(false)
            setNewMessage({
                from: 'me@example.com',
                to: [],
                cc: [],
                bcc: [],
                subject: '',
                content: ''
            } as CreateMessageRequest)
        })
    }


    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 border-r border-gray-700">
                <div className="p-4">
                    <Button className="w-full justify-start" variant="ghost">
                        <Inbox className="mr-2 h-4 w-4" />
                        Inbox
                    </Button>
                    <Button className="w-full justify-start" variant="ghost">
                        <Send className="mr-2 h-4 w-4" />
                        Sent
                    </Button>
                    <Button className="w-full justify-start" variant="ghost">
                        <Trash className="mr-2 h-4 w-4" />
                        Trash
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Search Bar */}
                <div className="p-4 bg-gray-800 border-b border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search messages" className="pl-8 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" />
                    </div>
                </div>

                {/* Message List, Action Bar, and Preview */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Message List */}
                    <ScrollArea className="w-1/3 border-r border-gray-700">
                        {messages.length === 0 ? (
                            <div className="p-4 text-center text-gray-400">
                                No messages
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${selectedMessage?.id === message.id ? 'bg-gray-600' : ''
                                        }`}
                                    onClick={() => handleMessageSelect(message)}
                                >
                                    <div className="font-semibold">{message.from}</div>
                                    <div className="text-sm text-gray-300">{message.subject}</div>
                                    <div className="text-xs text-gray-400">{message.date}</div>
                                </div>
                            ))
                        )}
                    </ScrollArea>

                    {/* Action Bar */}
                    <div className="w-10 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-4">
                        <Button variant="ghost" size="icon" title="Refresh" onClick={handleRefresh}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="New Message" onClick={handleCompose}>
                            <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Reply" onClick={handleReply}>
                            <Reply className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Forward" onClick={handleForward}>
                            <Forward className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete" onClick={handleDelete}>
                            <Trash className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Print" onClick={handlePrint}>
                            <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="More Options">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Message Preview or Compose */}
                    <div className="flex-1 bg-gray-800 p-4">
                        {isComposing ? (
                            <div className="h-full flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-100">New Message</h2>
                                    <Button variant="ghost" size="icon" onClick={() => setIsComposing(false)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Input
                                    className="mb-2"
                                    placeholder="To"
                                    value={newMessage.to?.join(', ')}
                                    onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value.split(',').map(message => message.trim()) })}
                                />
                                <Input
                                    className="mb-2"
                                    placeholder="Cc"
                                    value={newMessage.cc?.join(', ')}
                                    onChange={(e) => setNewMessage({ ...newMessage, cc: e.target.value.split(',').map(message => message.trim()) })}
                                />
                                <Input
                                    className="mb-2"
                                    placeholder="Bcc"
                                    value={newMessage.bcc?.join(', ')}
                                    onChange={(e) => setNewMessage({ ...newMessage, bcc: e.target.value.split(',').map(message => message.trim()) })}
                                />
                                <Input
                                    className="mb-2"
                                    placeholder="Subject"
                                    value={newMessage.subject}
                                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                                />
                                <Textarea
                                    className="flex-1 mb-2"
                                    placeholder="Message content"
                                    value={newMessage.content}
                                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                                />
                                <Button onClick={handleSend}>Send</Button>
                            </div>
                        ) : selectedMessage ? (
                            <div className="h-full flex flex-col">
                                <h2 className="text-2xl font-bold text-gray-100 mb-4">{selectedMessage.subject}</h2>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-300">From:</span> {selectedMessage.from}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold text-gray-300">To:</span> {selectedMessage.to.join(', ')}
                                </div>
                                {selectedMessage.cc.length > 0 && (
                                    <div className="mb-2">
                                        <span className="font-semibold text-gray-300">Cc:</span> {selectedMessage.cc.join(', ')}
                                    </div>
                                )}
                                {selectedMessage.bcc.length > 0 && (
                                    <div className="mb-2">
                                        <span className="font-semibold text-gray-300">Bcc:</span> {selectedMessage.bcc.join(', ')}
                                    </div>
                                )}
                                <div className="mb-4">
                                    <span className="font-semibold text-gray-300">Date:</span> {selectedMessage.date}
                                </div>
                                <ScrollArea className="flex-1">
                                    <div className="whitespace-pre-wrap text-gray-300">{selectedMessage.content}</div>
                                </ScrollArea>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                Select an message to view its content
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
