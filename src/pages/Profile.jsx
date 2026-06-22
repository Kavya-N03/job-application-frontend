import { useEffect, useState } from "react"
import { getProfile,createProfile,updateProfile } from "../apis/profileapi";
import { useNavigate } from "react-router-dom";


function Profile(){
    const navigate = useNavigate();
    const[profileExists,setProfileExists] = useState(false);

    const[profileData,setProfileData] = useState({
        first_name:"",
        last_name:"",
        gender:"",
        bio:"",
        phone:"",
        location:"",
        skills:"",
        education:[
            {
                degree:"",
                institution:""
            }
        ],

        experience:"",
        projects:[
            {
                title:"",
                description:"",
                link:""
            }
        ],
        socialLinks:[
            {
                github:"",
                linkedin:"",
            }
        ]
    });

    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);

    const fetchProfile = async () => {
    try {
        const data = await getProfile();

        if (data) {
            const profile = data;

            setProfileData({
                first_name: profile.firstName || "",
                last_name: profile.lastName || "",
                gender: profile.gender || "",
                bio: profile.bio || "",
                phone: profile.phone || "",
                location: profile.location || "",
                skills: profile.skills ? profile.skills.join(", ") : "",
                experience: profile.experience || "",

                education:
                    profile.education && profile.education.length > 0
                        ? profile.education
                        : [
                              {
                                  degree: "",
                                  institution: "",
                              },
                          ],

                projects:
                    profile.projects && profile.projects.length > 0
                        ? profile.projects.map((project) => ({
                              title: project.title || "",
                              description: project.description || "",
                              link: project.link || "",
                          }))
                        : [
                              {
                                  title: "",
                                  description: "",
                                  link: "",
                              },
                          ],

                socialLinks:
                    profile.socialLinks && profile.socialLinks.length > 0
                        ? profile.socialLinks.map((link) => ({
                              github: link.github || "",
                              linkedin: link.linkedin || "",
                          }))
                        : [
                              {
                                  github: "",
                                  linkedin: "",
                              },
                          ],
            });

            setProfileExists(true);
        }
    } catch (err) {
        console.error(err);
    }
};

    useEffect(()=>{
        fetchProfile();
    },[]);

    const handleChange=(e)=>{
        setProfileData({
            ...profileData,
            [e.target.name]:e.target.value
        })
    };

    const handleEducationChange=(e)=>{
        const{name,value} = e.target;
        const updatedEducation = [...profileData.education];
        updatedEducation[0][name] = value;

        setProfileData({
            ...profileData,
            education:updatedEducation
        })
    };

    const handleProjectChange = (e)=>{
        const{name,value} = e.target;
        const updatedProject = [...profileData.projects];
        updatedProject[0][name] = value;
        setProfileData({
            ...profileData,
            projects:updatedProject
        })
    };

    const handleLinksChange = (e)=>{
        const{name,value} = e.target;
        const updatedLinks = [...profileData.socialLinks];
        updatedLinks[0][name] = value;
        setProfileData({
            ...profileData,
            socialLinks:updatedLinks
        })
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.keys(profileData).forEach((key)=>{
            if(key === "education" || key === "projects" || key === "socialLinks"){
                formData.append(key, JSON.stringify(profileData[key]));
            }else{
                formData.append(key, profileData[key]);
            }
        });

        try{
            if(profileExists){
                await updateProfile(formData);
                alert("Profile Updated successfully.");
                navigate('/');
            }else{
                await createProfile(formData);
                alert("Profile Created successfully");
                navigate('/');
            }
            
        }catch(err){
            setError("Something went wrong!")
        }finally{
            setLoading(false);
        }

    }

    return(
        <div className="min-h-screen bg-gray-200 py-10 flex justify-center">
            <div className="w-full max-w-xl">
                <h1 className="text-3xl font-bold text-center mb-8">Create Profile</h1>
            {error&&
            <p className="text-lg text-red-500 text-center font-medium mt-4">{error}</p>
            }
            <p className="text-lg text-blue-700 text-center font-medium mt-4">{loading?"Loading...":""}</p>

    <form onSubmit={handleSubmit} className="space-y-4">

    <div>
        <label className="label">First Name</label>
        <input
            type="text"
            name="first_name"
            value={profileData.first_name}
            onChange={handleChange}
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Last Name</label>
        <input
            type="text"
            name="last_name"
            value={profileData.last_name}
            onChange={handleChange}
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Gender</label>
        <select
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            className="input-form"
        >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
    </div>

    <div>
        <label className="label">Bio</label>
        <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Phone</label>
        <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Location</label>
        <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            placeholder="Bangalore"
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Skills</label>
        <input
            type="text"
            name="skills"
            value={profileData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="input-form"
        />
    </div>

    <div className="px-2 py-4">
        <h2 className="font-bold text-xl text-slate-900 py-2">EDUCATION</h2>
        <label className="label">Degree</label>
        <input
            type="text"
            name="degree"
            value={profileData.education?.[0]?.degree || ""}
            onChange={handleEducationChange}
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Institution</label>
        <input
            type="text"
            name="institution"
            value={profileData.education?.[0]?.institution || ""}
            onChange={handleEducationChange}
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Experience</label>
        <input
            type="text"
            name="experience"
            value={profileData.experience}
            onChange={handleChange}
            placeholder="1 Year / Fresher"
            className="input-form"
        />
    </div>

    <div className="px-2 py-4">
        <h2 className="font-bold text-xl text-slate-900 py-2">PROJECTS</h2>
        <label className="label">Project Title</label>
        <input
            type="text"
            name="title"
            value={profileData.projects?.[0]?.title || ""}
            onChange={handleProjectChange}
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Project Description</label>
        <textarea
            name="description"
            value={profileData.projects?.[0]?.description || ""}
            onChange={handleProjectChange}
            className="input-form"
        />
    </div>

    <div>
        <label className="label">Project Link</label>
        <input
            type="text"
            name="link"
            value={profileData.projects?.[0]?.link || ""}
            onChange={handleProjectChange}
            className="input-form"
        />
    </div>


    <div className="px-2 py-4">
        <h2 className="font-bold text-xl text-slate-900 py-2">Social Links</h2>
        <label className="label">GitHub</label>
        <input
            type="text"
            name="github"
            value={profileData.socialLinks?.[0]?.github || ""}
            onChange={handleLinksChange}
            className="input-form"
        />
    </div>

    <div>
        <label className="label">LinkedIn</label>
        <input
            type="text"
            name="linkedin"
            value={profileData.socialLinks?.[0]?.linkedin || ""}
            onChange={handleLinksChange}
            className="input-form"
        />
    </div>


    <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
    >
        {profileExists? "Update Profile" : "Create Profile"}
    </button>

</form>
            </div>
            </div>
 
    )

}
export default Profile;