import React from 'react'
import { Button } from '../ui/button'
const NavbarPage = () => {
  return (
    <div className='w-full h-20 border-b-1 border-[#DDDDDE] bg-white flex items-center justify-center'>
        <div className='w-11/12 mx-auto flex items-center justify-between'>
        <div className=' text-[#4F4CEE] fw-bold text-2xl'> KARCIS.COM</div>
        <div className='flex items-center gap-4'>
         <Button variant={"outline"} size={"lg"}>Register</Button>
         <Button variant={'main'} size={"lg"}>Login</Button>
        </div>
        </div>
    </div>
  )
}

export default NavbarPage