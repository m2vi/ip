const Text = ({ label, value }: { label: string; value: string | boolean }) => {
  return (
    <div className='flex flex-col mb-4 col-span-1'>
      <span className='text-sm text-primary-300 uppercase mb-1 select-none'>{label}</span>
      <span className='text-base text-primary-200'>{value?.toString() ?? '-'}</span>
    </div>
  );
};

export default Text;
