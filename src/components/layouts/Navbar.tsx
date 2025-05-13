import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useAppSelector } from '@/store/hooks'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/provider'
import { logoutUser } from '@/store/slices/AuthSlice'

const NavbarPage = () => {
    const router = useRouter()
  const authState = useAppSelector(state => state.auth);
  const authenticated = authState?.isAuthenticated || false;
  const fullname  = authState?.fullname
  const dispatch = useDispatch<AppDispatch> ()

  const logout = () => {
    dispatch(logoutUser())
  }
    return (
        <div className='w-full h-20 border-b-1 border-[#DDDDDE] bg-white flex items-center justify-center'>
            <div className='w-11/12 mx-auto flex items-center justify-between'>
                <div className=' text-[#4F4CEE] fw-bold text-2xl'>KARCIS.COM</div>
                <div className='flex items-center gap-4'>
                    {
                        !authenticated ? (
                            <>
                                <Button variant={"outline"} size={"lg"} onClick={() => router.push('/register')}>Register</Button>
                                <Button variant={'main'} size={"lg"} onClick={() => router.push('/login')}>Login</Button>
                            </>
                        ) : (
                            <>
                                                        <span>Halo, {fullname}</span> 
                                                            <Button variant={'outline'} size={"lg"} onClick={logout}>Logout</Button>
                            </>
                            

                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default NavbarPage
