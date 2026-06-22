import { BASE_URL } from "../../config";
import { saveTokens } from "../utils/tokenServices";
import { getAccessToken } from "../utils/tokenServices";


export const registerUser = async(userData)=>{
        const response = await fetch(`${BASE_URL}/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        });
        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || "Registeration Failed");
        }
        return data
}

export const loginUser=async(userData)=>{
    const response = await fetch(`${BASE_URL}/login/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    });
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message || "Failed to Login")
    }
    saveTokens(data.accessToken)
    return data
}

export const createProfile = async (formData) => {
  const token = getAccessToken();

  console.log("TOKEN:", token);   

  const response = await fetch(`${BASE_URL}profiles/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to Create Profile");
  }
  return data;
};