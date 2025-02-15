'use client'
import { Plus } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useSidebar } from './ui/sidebar'

const PlusButton = () => {
    const { state } = useSidebar()

    return (
        <>
            {state === "collapsed" && (
                <Button variant="ghost" size="icon">
                    <Plus className="h-2 w-2" />
                    <span className="sr-only">New Chat</span>
                </Button>
            )}
        </>
    )
}

export default PlusButton