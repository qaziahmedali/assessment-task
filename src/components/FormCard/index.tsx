import React from 'react';

const FormCard = ({
  cardTitle,
  cardFooter,
  children,
}: {
  cardTitle: string;
  cardFooter: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='container mx-auto max-w-md shadow-md rounded-md bg-white'>
        <div className='p-6'>
          <h4 className='text-2xl font-semibold text-center mb-4 text-black'>
            {cardTitle}
          </h4>
          {children}
          {cardFooter}
        </div>
      </div>
    </div>
  );
};

export default FormCard;
