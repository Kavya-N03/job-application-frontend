import { useState } from "react"
import { registerUser } from "../apis/authapi";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        name:"",
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
            await registerUser(formData)
            navigate("/login")
        }catch(error){
            console.error("Error",error)
            setError(error.message || "Network error.Try again!")
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
            
            <h1 className="text-3xl font-bold text-center">Register</h1>
            {error&&
            <p className="text-lg text-red-500 text-center font-medium mt-4">{error}</p>
            }
            <p className="text-lg text-blue-700 text-center font-medium mt-4">{loading?"Loading...":""}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <input type="text" name="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="data-input"/>

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
            className="auth-btn">Register
            </button>
        
            <p className="text-sm text-center text-gray-500 mt-6">Already have an account? {""}
                <span 
                onClick={()=>navigate("/login")}
                className="text-blue-600 cursor-pointer hover:underline font-medium">Login</span>
            </p>
        </form>
        </div>
        </div>
    )

}
export default Register;