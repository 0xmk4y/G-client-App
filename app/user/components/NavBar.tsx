"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NavBar() {

    return (
        <div className='flex items-center'>
            <div className='flex w-full gap-8 items-center justify-between mx-3 md:mx-[200px] py-2'>
                <Link href={"/user/dashboard"} className='flex items-center gap-4'>
                    <Image
                        src='/logo-2.svg'
                        alt='logo'
                        width={100}
                        height={100}
                        className=''
                    />
                </Link>
                <div className='flex flex-col md:flex-row items-center text-sm md:gap-2'>
                    <Button className='shadow-none text-white font-bold rounded-full w-10 h-10 flex items-center justify-center'>JD</Button>
                    <p>{"John Jones"}</p>
                </div>
            </div>
        </div>
    );
}
