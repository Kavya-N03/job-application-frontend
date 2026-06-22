import { useEffect, useState } from "react";
import { getApplications } from "../apis/applyjob";

function Applications() {
    const [applyData, setApplyData] = useState([]);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const data = await getApplications();
            setApplyData(data.applications);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    My Applications
                </h1>

                {error && (
                    <p className="text-center text-red-500 mb-6">{error}</p>
                )}

                {applyData.length === 0 && !error && (
                    <p className="text-center text-gray-500">
                        No applications found.
                    </p>
                )}

                <div className="space-y-6">
                    {applyData.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
                        >
                            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                                {item.job.title}
                            </h2>

                            <p className="text-gray-600 mb-5">
                                {item.job.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Salary
                                    </p>
                                    <p className="text-gray-600">
                                        ₹{item.job.min_salary} LPA - ₹
                                        {item.job.max_salary} LPA
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800">
                                        Company
                                    </p>
                                    <p className="text-gray-600">
                                        {item.job.company.company_name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Applications;