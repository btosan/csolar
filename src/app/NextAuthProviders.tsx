'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface ProvidersProps {
    children: ReactNode,
}

export default function NextAuthProviders({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
