import Link from 'next/link';
import { BiError } from 'react-icons/bi';
import { IoHome } from 'react-icons/io5';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col text-center -m-14  items-center justify-center gap-6 h-screen '>
      <BiError className=' text-9xl  text-red-500' />

      <h2 className=' text-5xl'>Page Not Found!</h2>
      <p className='text-gray-600'>Please go to main page</p>

      <Link
        href='/'
        className='flex gap-3 items-center bg-slate-100 rounded-xl py-2 px-10'
      >
        <IoHome className=' text-2xl text-teal-950' />
        <span className=' text-xl text-teal-950'>{'->'}</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
