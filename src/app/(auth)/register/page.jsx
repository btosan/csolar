
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { BsPersonAdd } from 'react-icons/bs';
import SignUpForm from '@/components/forms/SignUpForm';

const page = () => {
  return (
    <div className='w-full py-12 '>
      <div className='md:px-16 lg:px-32 px-0'>
        <SignUpForm />
      </div>
      
    </div>
  );
};

export default page;
