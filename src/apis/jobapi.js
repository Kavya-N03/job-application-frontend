import { BASE_URL } from "../../config";

//To get all Jobs
export const getJobs=async()=>{
    const response = await fetch(`${BASE_URL}/jobs`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
    });
    const data = await response.json()

    if(!response.ok){
        throw new Error("Failed to display Jobs\nTry again!")
    }
    return data
}

//to display single job(object)
export const getJobById=async(_id)=>{
    const response = await fetch(`${BASE_URL}/jobs/${_id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }
    );
    if(!response.ok){
        throw new Error("Failed to fetch job details")
    }
    return response.json();
};

