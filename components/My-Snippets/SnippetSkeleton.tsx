export default function SnippetSkeleton() {
    return (
        <div className='bg-white py-2 rounded-lg shadow-sm'>
            <div className='px-5 flex justify-between items-baseline'>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold w-56 py-4 bg-slate-100'></h1>
                    <span className='py-2 w-20 bg-slate-100'></span>
                </div>
            </div>
            <div className='px-5 flex flex-wrap py-5 gap-2'>
                <Tag />
                <Tag />
                <Tag />
            </div>
            <p className='mx-5 bg-slate-100 py-6'></p>
            <div className='mx-5 px-1 bg-slate-100 text-xs py-12 my-2'></div>
            <div className='px-5 pt-2 flex justify-between text-sm'>
                <div className='flex gap-1 items-center bg-slate-100 py-1.5 px-5'></div>
            </div>
        </div>
    )
}

function Tag() {
    return (
        <div className='bg-slate-100 font-medium text-xs rounded-md py-1 px-2'></div>
    )
}