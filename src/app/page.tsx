export default function Home() {
  return (
    <div className='p-6'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
          {/* Card start */}
          <div className='bg-white rounded-lg shadow hover:shadow-lg transition-shadow'>
            <div className='p-4 border-b'>
              <h5 className='text-lg font-semibold'>#1 .Project Hanks</h5>
            </div>
            <div className='p-4'>
              <p className='mt-4 text-gray-700'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text.
              </p>
            </div>
            <div className='p-4 border-t flex justify-between items-center'>
              <p className='text-sm'>
                Due: <span className='font-semibold'>2023-06-02</span>
              </p>
              <div>
                {/* Example status: "In Progress" */}
                {/* <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    status === 'progress'
                      ? 'bg-blue-500'
                      : status === 'pending'
                      ? 'bg-yellow-500'
                      : status === 'testing'
                      ? 'bg-orange-500'
                      : status === 'complete'
                      ? 'bg-green-500'
                      : 'bg-gray-500'
                  }`}
                >
                  {status === 'progress'
                    ? 'In Progress'
                    : status === 'pending'
                    ? 'Pending'
                    : status === 'testing'
                    ? 'Testing'
                    : status === 'complete'
                    ? 'Complete'
                    : 'Unknown Status'}
                </span> */}
              </div>
            </div>
          </div>
          {/* Card end */}
        </div>
      </div>
    </div>
  );
}
