import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button'
import {  NotebookPen } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingSection from './BookingSection';

function SuggestedBusinessList({business}) {
  
  const [businessList,setBusinessList]=useState([]);
    useEffect(()=>{
       
        business&&getBusinessList()
    },[business]);

    const getBusinessList=()=>{
        GlobalApi.getBusinessByCategory(business?.category?.name)
        .then(resp=>{
            setBusinessList(resp?.businessLists);
        })
    }

  
  return (
    <div className='md:pl-10'>
     
      <BookingSection business={business}>
        <Button className="flex gap-2 w-full">
        <NotebookPen/>
        Book Appointment  
        </Button> 
      </BookingSection>
      <div className='hidden md:block'>
      <h2 className='font-bold 
      text-lg mt-3 mb-3
      
      '>Similar Business</h2>
      <div className=''>
        {businessList&&businessList.map((business,index)=>(
          <Link href={'/details/'+business.id} className="flex gap-2 mb-4
          hover:border rounded-lg p-2
          cursor-pointer hover:shadow-md
           border-primary">
            <Image src={business?.images[0].url}
            alt={business.name}
            width={80}
            height={80}
            className='rounded-lg object-cover h-[100px]'
            />
            <div className=''>
              <h2 className='font-bold'>{business.name}</h2>
              <h2 className='text-primary'>{business.contactPerson}</h2>
              <h2 className='text-gray-400'>{business.address}</h2>

            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}

export default SuggestedBusinessList