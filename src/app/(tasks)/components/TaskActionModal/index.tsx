import { ActionsMode } from '@/common/enums';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Modal from '@/components/Modal';
import { Task } from '@/models/task';
import {
  CreateTaskInput,
  UpdateTaskInput,
  UpdateTaskInputWithTimeStamp,
} from '@/types/task';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: CreateTaskInput | UpdateTaskInputWithTimeStamp) => void;
  initialValues: CreateTaskInput | Task;
  mode: ActionsMode;
  isSubmitting: boolean;
}
const taskSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title is too long'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().oneOf(['completed', 'inProgress'], 'Invalid status'),
});

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isSubmitting,
  mode,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className='text-lg font-bold mb-4 text-black'>
        {mode === ActionsMode.ADD ? 'Add Task' : 'Update Task'}
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={taskSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form className='space-y-4'>
          <InputField
            name='title'
            label='Title'
            type='text'
            placeholder='Enter task title'
          />
          <InputField
            name='description'
            label='Description'
            type='text'
            placeholder='Enter task description'
          />
          {mode === ActionsMode.UPDATE ? (
            <div>
              <InputField
                name='dueDate'
                label='Deadline'
                type='date'
                placeholder='Enter task description'
              />
              <InputField
                name='status'
                label='Status'
                type='select'
                placeholder='Select status'
                options={[
                  { value: 'inProgress', label: 'In Progress' },
                  { value: 'completed', label: 'Completed' },
                ]}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div className='flex justify-end'>
            <Button
              variant='danger'
              type='button'
              onClick={onClose}
              className='mr-2'
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting
                ? 'Submitting...'
                : mode === ActionsMode.ADD
                ? 'Add Task'
                : 'Update Task'}
            </Button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default TaskModal;
