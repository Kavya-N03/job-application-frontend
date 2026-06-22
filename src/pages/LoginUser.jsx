import { useState } from "react"
import { loginUser } from "../apis/authapi";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const[formData,setFormData] = useState({
        email:"",
        password:""
    });
    const[error,setError] = useState("")
    const[loading,setLoading] = useState(false)

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)

        try{
            await loginUser(formData);
            navigate('/');
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }


    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-200 ">
            <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
                <h1 className="text-3xl font-semibold text-center">Login</h1>
            {error&&
            <p className="text-lg text-red-500 text-center font-medium mt-4">{error}</p>
            }
            <p className="text-lg text-blue-700 text-center font-medium mt-4">{loading?"Loading...":""}</p>

           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input type="email" name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="data-input"/>

            <input type="password" name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="data-input"/>

            <button type="submit"
            className="auth-btn">Login
            </button>
            
            <p className="text-sm text-center text-gray-500 mt-6">Don't have a account? {""}
                <span 
                onClick={()=>navigate("/register")}
                className="text-blue-600 cursor-pointer hover:underline font-medium">Register</span>
            </p>
        </form>
        </div>
        </div>
    )
    

}
export default Login