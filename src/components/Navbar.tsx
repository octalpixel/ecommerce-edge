import { UserButton, useSession, SignInButton } from "@clerk/nextjs";

export function Navbar() {
    const { isSignedIn } = useSession();
    return (
        <header>
            <nav className="h-16 bg-base p-4 dark:bg-base-dark">
                {isSignedIn ? <UserButton /> : <SignInButton />}
            </nav>
        </header>
    );
}
