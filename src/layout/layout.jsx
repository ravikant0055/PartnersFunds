import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import React from 'react'
import Logo from '../components/Logo';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
        <nav className='flex justify-between items-center border-b h-[60px] px-4 py-2'>
            <Link to="/"><Logo/></Link>
            <div className='flex gap-4 items-center'>
                <SignedOut>
                <SignInButton />
                </SignedOut>
                <SignedIn>
                <UserButton />
                </SignedIn>
            </div>
        </nav>
        
        <main className='flex w-full flex-grow'>
            <Outlet/>
            {/* <Main/> */}
        </main>
    </div>
  )
}

export default Layout;