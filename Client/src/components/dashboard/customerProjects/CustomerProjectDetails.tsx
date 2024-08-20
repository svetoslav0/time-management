import mainLogo from '@/assets/timeManagementLogo.png';
import GearSvg from '@/UI/design/GearSvg';
export default function CustomerProjectDetails() {
    const data = [
        { date: '2023-10-01', description: 'Worked on project AWorked on project AWorked on project AWorked on project AWorked on project AWorked on project AWorked on project AWorked on project A', hours: 8 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
       
     
    ];
    return (
        <div className='mb-20 flex flex-col items-center px-4'>
            <div className='fixed left-[-4rem] top-[40rem] -z-10'>
                <GearSvg />
            </div>
            <div className='fixed right-[-7rem] top-[10rem] -z-10'>
                <GearSvg />
            </div>
            <div className='flex items-center justify-around -mt-4'>
                <img src={mainLogo} className='scale-35 m-0 mr-[-75px]' />
                <h1 className='m-0 font-mavenPro text-5xl font-medium text-welcomeMsgColor'>
                    OpsHero
                </h1>
            </div>
            <div className='mb-8 w-3/4 font-medium text-customBlue -mt-8'>
                <div className='flex'>
                    <p className='min-w-[150px]'>Employee Name:</p>
                    <span className='ml-2 text-black'>Dimitrov Ivan</span>
                </div>
                <div className='flex'>
                    <p className='min-w-[150px]'>Client Name:</p>
                    <span className='ml-2 text-black'>BackStack</span>
                </div>
                <div className='flex'>
                    <p className='min-w-[150px]'>Project Name:</p>
                    <span className='ml-2 text-black'>BackStack</span>
                </div>
            </div>
            <div className='w-3/4 overflow-hidden rounded-2xl border shadow-lg'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-customBlue text-white'>
                            <th className='p-4 text-left'>Date</th>
                            <th className='w-3/5 p-4 text-left'>Task</th>
                            <th className='p-4 text-left'>Total hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? 'bg-white': 'bg-customTableRowDarker shadow-TrInsetShadow'} min-h-12`}
                            >
                                <td className='p-4 font-bold text-welcomeMsgColor text-base'>{row.date}</td>
                                <td className='p-4 text-hoursDescription text-welcomeMsgColor font-medium'>{row.description}</td>
                                <td className='p-4 font-bold text-welcomeMsgColor text-base'>{row.hours.toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
