import { useEffect, useState } from "react";
import { getJobById } from "../apis/jobapi";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { SlWallet } from "react-icons/sl";
import ApplyJob from "../components/ApplyJob";

function JobDetail() {
    const { _id } = useParams();

    const [jobData, setJobData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchJob = async () => {
        setLoading(true);

        try {
            const data = await getJobById(_id);
            setJobData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [_id]);

    return (
        <div className="min-h-screen bg-slate-100 py-8 px-4">

            {loading && (
                <p className="text-center text-lg font-semibold">
                    Loading...
                </p>
            )}

            {error && (
                <p className="text-center text-red-500">
                    {error}
                </p>
            )}

            {jobData && (
                <div className="max-w-5xl mx-auto space-y-6">

                    <div className="bg-white rounded-xl shadow-md p-8">

                        <h1 className="text-3xl font-bold text-slate-900">
                            {jobData.title}
                        </h1>

                        <p className="text-lg text-slate-600 mt-1">
                            {jobData.company.name}
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mt-8">

                            <div className="flex items-center gap-3">
                                <SlWallet className="text-xl text-slate-600" />
                                <span>
                                    ₹{jobData.min_salary} - ₹{jobData.max_salary} LPA
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <IoLocationOutline className="text-xl text-slate-600" />
                                <span>{jobData.company.location}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <LuBriefcaseBusiness className="text-xl text-slate-600" />
                                <span>{jobData.experience}</span>
                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-xl shadow-md p-8 space-y-8">

                        <div>
                            <h2 className="job-heading">Description</h2>
                            <p className="text-slate-700 leading-7">
                                {jobData.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="job-heading">Responsibilities</h2>

                            <ul className="list-disc pl-5 space-y-2 text-slate-700">
                                {jobData.responsibilities?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="job-heading">About the Role</h2>

                            <ul className="list-disc pl-5 space-y-2 text-slate-700">
                                {jobData.roles?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="job-heading">Benefits</h2>

                            <ul className="list-disc pl-5 space-y-2 text-slate-700">
                                {jobData.benefits?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="job-heading">Skills Required</h2>

                            <div className="flex flex-wrap gap-3">
                                {jobData.skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-slate-300 text-slate-700 px-4 py-2 rounded-full text-sm hover:bg-slate-200 transition"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <ApplyJob jobId={jobData._id} />

                    </div>

                </div>
            )}
        </div>
    );
}

export default JobDetail;