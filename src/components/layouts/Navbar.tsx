import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const NavbarPage = () => {
    const router = useRouter()
    const [user, setUser] = useState<string | null>(null) 

   
    useEffect(() => {
        const loggedInUser = localStorage.getItem('fullName') 
        if (loggedInUser) {
            setUser(loggedInUser) 
        }
    }, [])

    const handleLogout = () => {
        setUser(null) 
        localStorage.removeItem('user') 
        router.push('/') 
    }

    return (
        <div className='w-full h-20 border-b-1 border-[#DDDDDE] bg-white flex items-center justify-center'>
            <div className='w-11/12 mx-auto flex items-center justify-between'>
                <div className=' text-[#4F4CEE] fw-bold text-2xl'> KARCIS.COM</div>
                <div className='flex items-center gap-4'>
                    {user ? (
                        <>
                            <span className='text-lg text-gray-700'>Hi, {user}</span>
                            <Button variant={'outline'} size={'lg'} onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button variant={'outline'} size={'lg'} onClick={() => router.push('/register')}>Register</Button>
                            <Button variant={'main'} size={'lg'} onClick={() => router.push('/login')}>Login</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavbarPage