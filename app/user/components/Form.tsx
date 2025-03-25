"use client"
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User, Lock, Mail, MapPin, GraduationCap, UsersRound, Phone, BadgeCent, Pencil, ChevronLeft, ChevronRight } from 'lucide-react'
import { Course } from '@/types/types'

export default function Form() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [Loading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
    const fetchCourses = async () => {
        try {
        const res = await fetch('/api/courses');
        setCourses(await res.json());
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    fetchCourses();
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          program: formData.get('program'),
          gender: formData.get('gender'),
          location: formData.get('location'),
          phone: formData.get('phone'),
          disabled: formData.get('disabled') === 'yes',
          image: formData.get('image'),
          description: formData.get('description'),
        };
      
        const response = await fetch('/api/learners/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        if (response.ok) {
          // Handle successful creation
          console.log('Learner created successfully');
        } else {
          // Handle creation error
          console.error('Failed to create learner');
        }
        setIsLoading(false);
      };
  return (
    <div className='md:mx-[70px] mt-10 flex justify-center items-center'>
        <form action="" onSubmit={handleSubmit} className='text-gray-600 text-[16px]'>
            <h3 className='font-bold text-[20px] md:text-[30px] text-black mb-4'>Start new application</h3>
            {/*  */}
            <div className='flex flex-col md:flex-row items-center gap-2 md:gap-10 mb-3 md:mb-6 w-full'>
                <div className='flex border items-center px-2 py-1 rounded-md bg-gray-100 w-full'>
                    <User size={20} />
                    <input type="text" name='firstName' className='border-none bg-transparent focus:outline-none px-2' placeholder='first name' required/>
                </div>
                <div className='flex border items-center px-2 py-1 rounded-md bg-gray-100 w-full'>
                    <User size={20} />
                    <input type="text" name='lastName' className='border-none bg-transparent focus:outline-none px-2' placeholder='Last name' required/>
                </div>
            </div>

            {/*  */}
            <div className='flex flex-col md:flex-row items-center gap-2 md:gap-10 mb-3 md:mb-6 w-full'>
                <div className='flex border items-center px-2 py-1 rounded-md bg-gray-100 w-full'>
                    <Mail size={20} />
                    <input type="text" name='email' className='border-none bg-transparent focus:outline-none px-2' placeholder='Email' required/>
                </div>
                <div className='flex border items-center px-2 py-1 rounded-md bg-gray-100 w-full'>
                    <MapPin size={20}/>
                    <input type="text" name='location' className='border-none bg-transparent focus:outline-none px-2' placeholder='Location' required/>
                </div>
            </div>

            {/*  */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-10 mb-3 md:mb-6 w-full">
              <div className="flex items-center border w-full bg-gray-100 rounded-md px-2 ">
                <GraduationCap  size={20} />
                <select name="program" id="program" className="bg-transparent border-none focus:outline-none p-2 w-full">
                  <option value="" disabled selected className="">Select Program</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center border w-full bg-gray-100 rounded-md px-2">
                <GraduationCap  size={20}/>
                <select name="gender" id="gender" className="bg-transparent border-none focus:outline-none p-2 w-full" required>
                  <option value="" disabled selected className="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/*  */}
            <div className='flex flex-col md:flex-row items-center gap-2 md:gap-10 mb-3 md:mb-6 w-full'>
                <div className="flex items-center border w-full bg-gray-100 rounded-md px-2">
                    <UsersRound  size={20}/>
                    <select name="diasable" id="diasable" className="bg-transparent border-none focus:outline-none p-2 w-full" required>
                    <option value="" disabled selected className="" >Disabled</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    </select>
                </div>
                <div className='flex border items-center px-2 py-1 rounded-md bg-gray-100 w-full'>
                    <Phone size={20} />
                    <input type="text" name='phone' className='border-none bg-transparent focus:outline-none px-2' placeholder='Phone' required/>
                </div>
            </div>

            {/*  */}
            <div className="w-full items-center gap-1.5 bg-gray-100 mb-3 md:mb-6">
                <Input type="link" name='image' placeholder='image link' required />
            </div>

            {/*  */}
            {/* <div className="flex items-center border w-full bg-gray-100 px-2 py-1 rounded-md mb-3 md:mb-6 "> 
                <BadgeCent size={20}/>
                <input type="text" name="amount" id="amount" className="border-none bg-transparent focus:outline-none px-2 w-full" placeholder="Amount"/>
            </div> */}

            {/*  */}
            <div>
                <div className="flex items-center border w-full bg-gray-100 px-2 py-1 rounded-md">
                    <textarea cols={5} rows={5}
                        name="description"
                        id="description"
                        className="bg-transparent border-none focus:outline-none p-2 w-full"
                        placeholder="Description"
                        required
                    ></textarea>
                </div>
            </div>

            {/* Submit button */}
            <div className='flex gap-4 my-10'>
                <Link href={"/user/dashboard"} className="flex items-center gap-2 text-sm px-8 py-2 font-bold bg-gray-100 text-gray-600 hover:bg-gray-300 shadow-none" >
                    <ChevronLeft size={20} />
                    <p>Back</p>
              </Link>
                <Button className='px-8 py-1 shadow-none font-bold'>
                    <p>Register</p>
                    <ChevronRight size={20} />
                </Button>
            </div>
        </form>
    </div>
  )
}
