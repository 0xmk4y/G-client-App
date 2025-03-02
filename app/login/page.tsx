"use client"
import React from 'react'
import { Mail, LockKeyhole, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

export default function Page() {
    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState(''); 

    const searchParams = useSearchParams()
    const msg = searchParams.get('msg')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('/api/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            
            const res = await response.json();
      
            if (!response.ok) {
              throw new Error(res.message || 'Login failed');
            }
      
            console.log('Login successful');
      
            const admin = res.admin;
            localStorage.setItem('admin', JSON.stringify(admin));
      
            router.push('/user/dashboard');
          } catch (error: any) {
            console.error('An error occurred:', error);
            setError(error.message || 'An unexpected error occurred');
          } finally {
            setIsLoading(false);
          }
        };

    return (
        <div className='flex bg-primary md:bg-white h-screen text-white'>
            {/* <SideBar /> */}
            <div className='flex flex-col w-full p-3'>
                <div className='flex justify-between md:justify-end md:items-end w-full mb-[50px] space-x-3'>
                    <Link href={"/"} className='underline hidden md:block'>Need to create an account?</Link>
                    <Image 
                        src={'/logo.svg'}
                        alt='Company Logo'
                        height={100}
                        width={100}
                    />
                    <Link href={"/signup"} className='text-primary md:text-white bg-white md:bg-primary px-4 py-2 font-bold hover:bg-gray-200 md:hover:bg-primary/80 rounded-md'>Sign up</Link>
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    <h3 className='font-bold text-white md:text-black text-[27px] mb-4 w-full text-center p-2'>Login into your account</h3>
                    <form onSubmit={handleSubmit} className='text-sm w-full md:max-w-[400px] p-3 bg-white text-gray-400 rounded-md py-8'>
                    <p className='text-green-600 text-sm text-center mb-4'>{msg}</p>
                        <div className='flex items-center border dark:border-gray-500 border-b-2 border-b-primary mb-8 bg-gray-100'>
                            <Mail className='mx-1 dark:text-primary' />
                            <input type="email" name='email' placeholder='Email' className='p-2 w-full focus:ring-0 outline-none bg-transparent text-black' required/>
                        </div>
                        <div className='flex items-center border dark:border-gray-500 border-b-2 border-b-primary mb-4 bg-gray-100'>
                            <LockKeyhole className='mx-1 dark:text-primary'/>
                            <input type="password" name='password' placeholder='Password' className='p-2 w-full focus:ring-0 outline-none bg-transparent text-black' required />
                        </div>
                        {error && (
                            <div className='text-red-500 mb-4 text-center'>
                                <p>{error}</p>
                            </div>
                        )}
                        <Link href={"/admin/reset-password-email"} className='text-primary'>Forgot Password</Link>
                        <div className='w-full'>
                            <Button type="submit" className='bg-primary text-white py-2 px-4 mt-4 w-full'>
                                { isLoading ? 'Loading..' : 'Login'}
                                <ChevronRight className='inline ml-2' size={16} />
                            </Button>
                        </div>
                    </form>
                </div>
                <div className='text-center mt-6 text-sm'>
                    <p>By confirming your email, you agree to our Terms of Service and that you have read and understood our Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}
