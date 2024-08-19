export default function CustomerProjectDetails() {
    const data = [
        { date: '2023-10-01', description: 'Worked on project A', hours: 8 },
        { date: '2023-10-02', description: 'Meeting with client', hours: 2 },
        { date: '2023-10-03', description: 'Developed feature X', hours: 7 },
        { date: '2023-10-04', description: 'Code review', hours: 3 },
        { date: '2023-10-04', description: 'Code review', hours: 3 },
        { date: '2023-10-04', description: 'Code review', hours: 3 },
        { date: '2023-10-04', description: 'Code review', hours: 3 },
        { date: '2023-10-04', description: 'Code review', hours: 3 },
        { date: '2023-10-04', description: 'Code review', hours: 3 },
        { date: '2023-10-04', description: 'Code review', hours: 3 },
        { date: '2023-10-04', description: 'Code review', hours: 3 },
      
    ];
    return (
        <div className="flex flex-col items-center mt-10 mb-20 px-4">
        <h1 className="text-center mb-4 text-4xl font-bold">OpsHero</h1>
        <div className="w-3/4 border rounded-2xl shadow-lg overflow-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-4">Date</th>
                        <th className="p-4 w-3/5">Description</th>
                        <th className="p-4">Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                            <td className="p-4">{row.date}</td>
                            <td className="p-4">{row.description}</td>
                            <td className="p-4">{row.hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}
