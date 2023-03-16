"use client"

import { useSession, UserButton, SignInButton } from "@clerk/nextjs"
import Link from "next/link"

export function Navbar() {
    const { isSignedIn } = useSession()
    return (
        <header>
            <nav className="flex h-16 items-center justify-between bg-base p-4 dark:bg-base-dark">
                {isSignedIn ? <UserButton /> : <SignInButton />}
                <ul className="flex items-center gap-1">
                    <Link href="/">Home</Link>
                    <Link href="/_">Admin</Link>
                    <Link href="/_/products">Products</Link>
                    <Link href="/_/products/add">Add Product</Link>
                </ul>
            </nav>
        </header>
    )
}
