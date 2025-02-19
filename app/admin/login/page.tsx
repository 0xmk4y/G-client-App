import React from 'react'
import { Mail, LockKeyhole, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function page() {
  return (
    <div className='flex'>
        <div className='bg-primary h-screen hidden md:block'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, voluptates.</p>
        </div>

        <div className='flex flex-col w-full p-3'>
            <div className='flex justify-between md:justify-end md:items-end w-full mb-[50px] space-x-3'>
                <Link href={"/"} className='underline hidden md:block'>Need to create an account ?</Link>
                <Image 
                    src={'/logo.svg'}
                    alt='logo'
                    height={100}
                    width={100}
                />
                <Button className='text-primary md:text-white bg-white md:bg-primary '>Sign Up <ChevronRight className='inline mb-1' size={16} /></Button>
            </div>
            <div className='flex flex-col justify-center items-center w-full'>
                <h3 className='font-bold text-white md:text-black text-[27px] mb-14 w-full text-center p-2'>Login into your account</h3>
                <form action="" className='text-sm w-full md:max-w-[400px] p-3 bg-white text-gray-400'>
                    <div className='flex items-center border dark:border-gray-500 border-b-2 border-b-primary mb-8 bg-gray-100'>
                        <Mail className='mx-1 dark:text-primary' />
                        <input type="text" placeholder='Email' className='p-2 w-full focus:ring-0 outline-none bg-transparent text-black' />
                    </div>
                    <div className='flex items-center border dark:border-gray-500 border-b-2 border-b-primary mb-4 bg-gray-100  '>
                        <LockKeyhole className='mx-1 dark:text-primary'/>
                        <input type="password" placeholder='Password' className='p-2 w-full focus:ring-0 outline-none bg-transparent text-black' />
                    </div>
                    <Link href={"/admin/reset-password-email"} className='text-primary'>Forgot Password</Link>
                    <div className='w-full'>
                        <Button disabled className='bg-primary text-white py-2 px-4 mt-4 w-full'>
                           Login
                            <ChevronRight className='inline ml-2' size={16} />
                        </Button>
                    </div>
                </form>
            </div>
            <div className='text-center mt-6 text-sm'>
                <p>By confirming your email, you agree to our Terms of Service</p>
                <p>and that you have read and understood our Privacy Policy</p>
            </div>
        </div>
    </div>
  )
}
