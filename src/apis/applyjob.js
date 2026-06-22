import { BASE_URL } from "../../config";
import { getAccessToken } from "../utils/tokenServices";


//apply jobs
export const applyJob = async (jobId,formData) => {
    const token = getAccessToken();

    const response = await fetch(`${BASE_URL}/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

//display applications
export const getApplications=async()=>{
    const token = getAccessToken();
    const response = await fetch(`${BASE_URL}/applications`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    });
    if(!response.ok){
        throw new Error("Error in displaying your Applications"||data.message)
    }
    return response.json();
}