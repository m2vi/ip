import Head from 'next/head';
import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Head>
        <title>IP Lookup</title>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml'></link>
      </Head>
      <div className='aspect-video max-w-4xl w-full bg-primary-800 mb-6 shadow-lg overflow-hidden'>{children}</div>
    </div>
  );
};

export default Container;
