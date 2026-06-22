import { useNavigate } from "react-router-dom"
import homebg from "../assets/home-bg.jpg"
function HomePage(){
    const navigate = useNavigate()

    return(
        <div className="min-h-screen flex justify-evenly items-center ">
            <div className="max-w-xl space-y-6">
            <h1 className="text-5xl text-blue-950 font-bold leading-tight">Find the Most Exciting Jobs and Shape Your Future</h1>
            <p className="text-lg text-gray-600 font-medium">Create your profile, showcase your skills, and land the opportunity you've been waiting for.
            </p>
            <button onClick={()=>navigate("/jobs")}
            className="bg-blue-600 px-6 py-3 rounded-lg cursor-pointer
            text-white font-semibold hover:bg-blue-700 transition">Browse Jobs</button>
            </div>

            <div>
                <img src={homebg} alt="job search" className="w-150"/>
            </div>

        </div>
    )

}
export default HomePage