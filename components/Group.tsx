import { ReactNode } from 'react';

const Group = ({ children }: { children: ReactNode }) => {
  // return <div className='grid grid-flow-col gap-10 auto-cols-max'>{children}</div>;

  return <div className='grid grid-flow-col grid-cols-4 gap-11'>{children}</div>;
};

export default Group;
