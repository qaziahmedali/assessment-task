import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4'>
      <div className='bg-white dark:bg-gray-200 p-6 rounded-lg w-[90%] md:w-[50%] max-h-[90vh] overflow-auto'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
