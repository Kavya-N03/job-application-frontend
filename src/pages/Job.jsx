import { useEffect, useState } from "react"
import { getJobs } from "../apis/jobapi";
import JobCard from "../components/JobCard";

function Job(){
    const[jobs,setJobs] = useState([]);
    const[searchRole,setSearchRole] = useState("")
    const[searchLocation,setSearchLocation] = useState("")
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);

    const fetchAllJobs = async()=>{
        try{
            const data = await getJobs(jobs)
            setJobs(data.jobs)

        }catch(err){
            setError("Something went wrong..")
        }
    }

    useEffect(()=>{
        fetchAllJobs();
    },[]);

    
    return(
        <div>
        <JobCard jobs={jobs} error={error}/>
        </div>
    )

}
export default Job