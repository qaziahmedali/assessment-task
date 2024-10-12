import React from 'react';

import Modal from '../Modal';
import Button from '../Button';

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  taskTitle: string;
  isSubmitting: boolean;
}> = ({ isOpen, onClose, onDelete, taskTitle, isSubmitting }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h3 className='text-lg font-bold mb-4 text-black'>
      Are you sure you want to delete {taskTitle}?
    </h3>
    <div className='flex justify-end'>
      <Button variant='secondary' onClick={onClose} className='mr-2'>
        Cancel
      </Button>
      <Button disabled={isSubmitting} variant='danger' onClick={onDelete}>
        {isSubmitting ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  </Modal>
);

export default ConfirmationModal;
