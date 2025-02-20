import React from 'react'
import DashboardNav from '@/components/DashboardNav'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import Courses from './components/Courses'

export default function page() {
  return (
    <div className="w-full px-3 md:px-8">
      <div className="flex justify-end w-full p-3">
        <DashboardNav />
      </div>
      <div className="container mx-auto w-full">
        <h3 className="font-bold mb-8">Courses</h3>
        <div className="flex gap-8 mb-8">
          <SearchBar placeholder="Search Invoice" />
            <Link href="/admin/courses/create-course" className="w-[200px] text-center py-2 text-white font-bold bg-primary">Create course</Link>
        </div>
        <div>
          <Courses />
        </div>
      </div>
    </div>
  )
}
