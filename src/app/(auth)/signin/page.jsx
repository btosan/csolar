
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { BsPersonAdd } from 'react-icons/bs';
import SignInForm from '@/components/forms/SignInForm';
import { Suspense } from 'react';

const Page = () => {
  return (
    <div className='w-full py-12 '>
      <div className='md:px-16 lg:px-32 px-0'>
        <Suspense fallback={<div>Loading...</div>}>
          <SignInForm />
        </Suspense>
      </div>
      
    </div>
  );
};

export default Page;