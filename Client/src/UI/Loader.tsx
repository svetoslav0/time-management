const Loader = () => {
    return (
        <div className='absolute z-50'>
            <div className=' mt-64 flex w-32 justify-center'>
                <span className='relative flex h-20 w-20'>
                    <span className='h-24 w-24 rounded-full border-b-8 border-t-8 border-gray-200'></span>
                    <span className='absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-b-8 border-t-8 border-blue-500'></span>
                </span>
            </div>
        </div>
    );
};
export default Loader;
