"use client";
import React, { useState } from 'react';
import HomeSideBar from './Home-SideBar';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
import useLoginModalStore from '@/store/LoginModal';
import LoginModal from '@/Modal/LoginModal';

export default function NavBar() {
    const loginModal = useLoginModalStore((state) => state.isOpen);
    const openLoginModal = useLoginModalStore((state) => state.openModal);
    const closeLoginModal = useLoginModalStore((state) => state.closeModal);

    return (
        <div className='flex items-center'>
            {/* Desktop */}
            <div className='hidden md:flex w-full gap-8 items-center justify-between mx-[200px] py-2'>
                <div className='flex items-center gap-4'>
                    <Image
                        src='/logo-2.svg'
                        alt='logo'
                        width={100}
                        height={100}
                        className=''
                    />
                    <div className='flex gap-4'>
                        <Link href={"#home"} scroll={false} legacyBehavior>
                            <div onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                            }}>Home</div>
                        </Link>
                        <Link href={"#courses"} scroll={false} legacyBehavior>
                            <div onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' });
                            }}>Courses</div>
                        </Link>
                    </div>
                </div>
                <Button className='max-w-[100px] shadow-none text-white font-bold rounded-md' onClick={openLoginModal}>Login <span><LogIn /></span></Button>
                {loginModal && (
                    <>
                        <div className='fixed inset-0 z-40 w-full' onClick={closeLoginModal}></div>
                        <LoginModal />
                    </>
                )}
            </div>




            {/* Mobile */}
            <div className='w-full flex justify-between md:hidden'>
                <Image
                    src='/logo-2.svg'
                    alt='logo'
                    width={100}
                    height={100}
                    className='p-4'
                />
                <HomeSideBar />
            </div>
        </div>
    );
}
