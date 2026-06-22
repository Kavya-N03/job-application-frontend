import { useState } from "react";
import { applyJob } from "../apis/applyjob";
import { getAccessToken } from "../utils/tokenServices";

function ApplyJob({ jobId }) {
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");

    const handleResume = (e) => {
        setResume(e.target.files[0]);
    };

    const handleApply = async () => {
        try {
            const token = getAccessToken();

            if (!token) {
                alert("Please Login to Apply");
                return;
            }

            if (!resume) {
                alert("Please upload resume");
                return;
            }

            const formData = new FormData();
            formData.append("resume", resume);

            console.log("Job ID:", jobId);

            await applyJob(jobId, formData);

            alert("Job Applied Successfully ✅");
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col space-y-4 max-w-md mx-auto">
            {error && <p className="text-md text-red-500">{error}</p>}

            <h3 className="heading">
                Upload your resume for this application
            </h3>

            <input
                type="file"
                accept=".pdf,.doc,.docx"
                name="resume"
                onChange={handleResume}
                className="w-full rounded-lg border-2 border-dashed border-blue-500 text-slate-700
                file:py-2 file:px-4 file:font-semibold file:text-blue-700"
            />

            <button
                type="button"
                onClick={handleApply}
                className="bg-blue-500 px-4 py-3 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
                Apply Now
            </button>
        </div>
    );
}

export default ApplyJob;