const SearchBar = () => {
    return (
        <form className='mx-auto mt-5 flex max-w-md items-center rounded-lg border p-2 shadow-md'>
            <input
                type='text'
                placeholder='Search...'
                className='mr-2 flex-grow rounded-lg border p-2 focus:outline-none'
            />
            <button className='rounded-lg bg-blue-700 px-4 py-2 text-white transition-colors hover:bg-blue-800'>
                Search
            </button>
        </form>
    );
};

export default SearchBar;
