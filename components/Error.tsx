import { ExclamationIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const ErrorText = ({ message }: { message: string }) => {
  const { reload } = useRouter();

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div
        className='flex flex-col justify-center items-center text-center text-orange-500 mb-3 cursor-pointer'
        title='Reload'
        onClick={() => reload()}
      >
        <ExclamationIcon className='h-11 w-11' />
        <span className='text-base'>Error&#58;&nbsp;{message.trim()}</span>
      </div>
    </div>
  );
};

export default ErrorText;
