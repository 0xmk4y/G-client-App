"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import google from '@/public/google.svg';
import { User2, Mail, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ActiveProps {
    setActive: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpModal({ setActive }: ActiveProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPass: formData.get('confirmPassword'),
        };

        try {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle successful signup
                console.log('Signup successful');
                const responseData = await response.json();
                localStorage.setItem('user', JSON.stringify(responseData.user));
                router.push('/login?msg=Account+created+successfully.+Please+login');
            } else {
                // Handle signup error
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed');
                console.error('Signup failed');
            }
        } catch (error) {
            setError('An unexpected error occurred');
            console.error('An unexpected error occurred', error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className='bg-white text-black border p-4 absolute z-50' style={{ top: '50px', right: '200px', width: '400px' }}>
            <h4 className='font-bold text-center text-[30px]'>Signup</h4>
            <button onClick={() => signIn('google', { callbackUrl: '/user/dashboard' })} className='flex justify-center mt-4 border border-primary px-8 py-2 text-sm gap-2 w-full'>
                <Image src={google} alt='google' height={20} width={20} />
                <p className='text-primary font-bold'>Login using Google</p>
            </button>
            <p className='text-center my-4'>or</p>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex gap-2'>
                    <div className='border flex items-center px-2 py-2 bg-gray-100 rounded-md'>
                        <User2 size={20} />
                        <input type="text" name="firstName"  className='focus:outline-none px-2 w-full bg-transparent' placeholder='First name' required />
                    </div>
                    <div className='border flex items-center px-2 py-2 bg-gray-100 rounded-md'>
                        <User2 size={20} />
                        <input type="text" name="lastName" className='focus:outline-none px-2 bg-transparent w-full' placeholder='Last name' required />
                    </div>
                </div>
                <div className='border flex items-center px-2 py-2 bg-gray-100 rounded-md'>
                    <Mail size={20} />
                    <input type="email" name="email"  className='focus:outline-none px-2 w-full bg-transparent' placeholder='Email' required />
                </div>
                <div className='border flex items-center px-2 py-2 bg-gray-100 rounded-md'>
                    <Lock size={20} />
                    <input type="password" name="password" className='focus:outline-none px-2 bg-transparent w-full' placeholder='Password' required />
                </div>
                <div className='border flex items-center px-2 py-2 bg-gray-100 rounded-md'>
                    <Lock size={20} />
                    <input type="password" name="confirmPassword" className='focus:outline-none px-2 bg-transparent w-full' placeholder='Confirm password' required />
                </div>
                <Button type="submit" className='font-bold'>
                    <span>{ isLoading ? 'Loading..' : 'Sign up'}</span>
                    <ChevronRight />
                </Button>
                <div className='flex items-center justify-center gap-1'>
                    <p>Already have an account?</p>
                    <Link href="#" className='text-primary' onClick={() => setActive("login")}>Log in</Link>
                </div>
            </form>
        </div>
    );
}
