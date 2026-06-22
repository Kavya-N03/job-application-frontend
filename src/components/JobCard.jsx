import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { SlWallet } from "react-icons/sl";

function JobCard({ jobs, error }) {
    return (
        <div className="flex justify-center px-4">

            {error && (
                <h3 className="text-red-500 text-lg">{error}</h3>
            )}

            <div className="grid grid-cols-1 gap-6 w-full max-w-3xl py-6">

                {jobs?.map((job) => (
                    <Link
                        key={job._id}
                        to={`/jobs/${job._id}`}
                    >
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 px-6 py-5">

                            <h2 className="text-2xl font-semibold text-slate-900">
                                {job.title}
                            </h2>

                            <p className="text-slate-500 mt-1">
                                {job.company.name}
                            </p>

                            <div className="flex flex-wrap gap-6 mt-5 text-slate-700">

                                <div className="flex items-center gap-2">
                                    <IoLocationOutline className="text-slate-600" />
                                    <span>{job.company.location}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <SlWallet className="text-slate-600" />
                                    <span>
                                        ₹ {job.min_salary} - {job.max_salary} LPA
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <LuBriefcaseBusiness className="text-slate-600" />
                                    <span>{job.experience}</span>
                                </div>

                            </div>

                            <div className="flex flex-wrap gap-2 mt-5">

                                {job.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
}

export default JobCard;