import { Link } from 'react-router-dom';

function UserProjects({
    projects,
}: {
    projects: {
        _id: string;
        projectName: string;
    }[];
}) {
    if (!projects || projects.length < 0) {
        return (
            <h1 className='mt-14 text-center text-xl font-semibold text-customDarkBlue'>
                There is not available projects
            </h1>
        );
    }
    return (
        <div className='grid grid-cols-2 mt-14 gap-4'>
            {projects.map((project) => (
                <div key={project._id} className='flex  border-collapse overflow-hidden rounded-2xl border-[1px] border-l-0 border-white transition duration-200 ease-out hover:border-customBlue '>
                    <div className='h-full w-[9px] bg-customBlue'></div>
                    <div className='ml-2 w-full text-lg flex justify-between'>
                        <p className='mt-5 font-bold text-customDarkBlue'>
                            Project name: {project.projectName}
                        </p>
                        <div className='mb-5 ml-4 mr-[41px] mt-4 flex justify-between'>
                            <Link to={`/admin/projects/${project._id}`} className='secondaryBtn'>
                                Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default UserProjects;
