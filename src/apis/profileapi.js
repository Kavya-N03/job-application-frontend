import { BASE_URL } from "../../config";
import { getAccessToken } from "../utils/tokenServices";

export const getProfile = async()=>{
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/profile`,{
    method:"GET",
    headers:{
      Authorization:`Bearer ${token}`
    },
  });

  const data = await response.json();
  if(!response.ok){
    throw new Error(data.message)
  }
  return data.profile;
}


export const createProfile = async (formData) => {
  const token = getAccessToken();

  console.log("TOKEN:", token);   

  const response = await fetch(`${BASE_URL}/profile`, {
    method: "POST",
    headers: {
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


export const updateProfile = async(formData)=>{
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/profile`,{
    method:"PUT",
    headers:{
      Authorization:`Bearer ${token}`
    },
    body:formData
  });

  const data = await response.json();
  if(!response.ok){
    throw new Error(data.detail || "Failed to update profile");
  }
  return data;
};