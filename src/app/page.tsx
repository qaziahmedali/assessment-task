'use client';

import { useState } from 'react';

export default function Home() {
  // Initial task data
  const initialCards = [
    { id: 1, title: 'Project Hanks', dueDate: '2023-06-02' },
    { id: 2, title: 'Project Alpha', dueDate: '2023-06-10' },
    { id: 3, title: 'Project Beta', dueDate: '2023-07-15' },
    { id: 4, title: 'Project Gamma', dueDate: '2023-08-20' },
  ];

  // State to manage tasks
  const [cards, setCards] = useState(initialCards);
  const [page, setPage] = useState(1); // Current page
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const totalPages = 3; // Total pages for pagination

  // Load more cards functionality (simulates API fetch)
  const loadMoreCards = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newCards = [
        {
          id: cards.length + 1,
          title: 'New Project ' + (cards.length + 1),
          dueDate: '2023-09-05',
        },
        {
          id: cards.length + 2,
          title: 'New Project ' + (cards.length + 2),
          dueDate: '2023-09-12',
        },
      ];
      setCards((prevCards) => [...prevCards, ...newCards]);
      setPage(page + 1);
      setIsLoading(false);
    }, 1000); // Simulates network delay
  };

  // Handle adding a new task
  const handleAddTask = (newTask) => {
    setCards([...cards, { id: cards.length + 1, ...newTask }]);
    setShowAddModal(false);
  };

  // Handle updating a task
  const handleUpdateTask = (updatedTask) => {
    setCards(
      cards.map((card) =>
        card.id === updatedTask.id ? { ...card, ...updatedTask } : card
      )
    );
    setShowUpdateModal(false);
  };

  // Handle deleting a task
  const handleDeleteTask = () => {
    setCards(cards.filter((card) => card.id !== selectedTask.id));
    setShowDeleteModal(false);
  };

  return (
    <div className='bg-white text-black min-h-screen flex flex-col'>
      {/* Header */}
      <header className='fixed top-0 left-0 right-0 z-50 p-6 bg-gray-100 dark:bg-gray-900 border-b flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Task Project</h1>
        <div className='flex space-x-6 items-center'>
          <button className='bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded'>
            {true ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
          <div className='relative'>
            <button className='bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded'>
              Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className='flex-grow p-6 pt-24 pb-20'>
        <div className='container mx-auto'>
          <div className='flex justify-between mb-4'>
            <h2 className='text-xl font-semibold'>Tasks</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Add Task
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
            {cards.map((card) => (
              <div
                key={card.id}
                className='bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-lg transition-shadow'
              >
                <div className='p-4 border-b flex justify-between items-center'>
                  <h5 className='text-lg font-semibold'>
                    #{card.id} .{card.title}
                  </h5>
                  <div className='flex space-x-2'>
                    {/* Edit icon */}
                    <button
                      className='text-blue-500 hover:text-blue-700 dark:hover:text-blue-300'
                      onClick={() => {
                        setSelectedTask(card);
                        setShowUpdateModal(true);
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.862 3.487a2.25 2.25 0 113.182 3.182L7.181 19.533a4.5 4.5 0 01-1.738 1.09l-4.032 1.21a.375.375 0 01-.47-.47l1.209-4.032a4.5 4.5 0 011.09-1.738L16.862 3.487z'
                        />
                      </svg>
                    </button>
                    {/* Delete icon */}
                    <button
                      className='text-red-500 hover:text-red-700 dark:hover:text-red-300'
                      onClick={() => {
                        setSelectedTask(card);
                        setShowDeleteModal(true);
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className='p-4'>
                  <p className='mt-4 text-gray-700 dark:text-gray-300'>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
                <div className='p-4 border-t flex justify-between items-center'>
                  <p className='text-sm dark:text-gray-400'>
                    Due: <span className='font-semibold'>{card.dueDate}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {page < totalPages && (
            <div className='text-center mt-6'>
              <button
                onClick={loadMoreCards}
                className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all'
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}

          {/* Pagination info */}
          <div className='text-center mt-4'>
            <p className='text-gray-600 dark:text-gray-400'>
              Page {page} of {totalPages}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='fixed bottom-0 left-0 right-0 p-6 bg-gray-100 dark:bg-gray-900 border-t text-center'>
        <p className='text-gray-600 dark:text-gray-400'>
          &copy; 2024 Task Project. All rights reserved.
        </p>
      </footer>

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTask}
        />
      )}

      {/* Update Task Modal */}
      {showUpdateModal && (
        <UpdateTaskModal
          task={selectedTask}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateTask}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          task={selectedTask}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

function AddTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (title && dueDate) {
      onAdd({ title, dueDate });
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg'>
        <h3 className='text-lg font-bold mb-4'>Add Task</h3>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border rounded px-4 py-2 w-full mb-4'
        />
        <input
          type='date'
          placeholder='Due Date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className='border rounded px-4 py-2 w-full mb-4'
        />
        <div className='flex justify-end'>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded mr-2'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={handleSubmit}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

function UpdateTaskModal({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = () => {
    if (title && dueDate) {
      onUpdate({ id: task.id, title, dueDate });
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg'>
        <h3 className='text-lg font-bold mb-4'>Update Task</h3>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border rounded px-4 py-2 w-full mb-4'
        />
        <input
          type='date'
          placeholder='Due Date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className='border rounded px-4 py-2 w-full mb-4'
        />
        <div className='flex justify-end'>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded mr-2'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={handleSubmit}
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmationModal({ task, onClose, onDelete }) {
  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg'>
        <h3 className='text-lg font-bold mb-4'>
          Are you sure you want to delete "{task.title}"?
        </h3>
        <div className='flex justify-end'>
          <button
            className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
