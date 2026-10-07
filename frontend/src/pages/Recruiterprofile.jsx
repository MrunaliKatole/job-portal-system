import { useEffect, useState } from "react";
import API from "../services/api";

function RecruiterProfile() {

const userId = localStorage.getItem("userId");

const [profile,setProfile]=useState({

userId:{
userId:Number(userId)
},

firstName:"",
lastName:"",
city:"",
state:"",
country:"",
company:"",
profilePhoto:""

});

useEffect(()=>{

loadProfile();

},[]);

const loadProfile=async()=>{

try{

const res=await API.get(`/recruiter/${userId}`);

if(res.data){

setProfile(res.data);

}

}catch(err){

console.log(err);

}

};

const handleChange=(e)=>{

setProfile({

...profile,

[e.target.name]:e.target.value

});

};

const saveProfile=async()=>{

try{

await API.post(
  `/recruiter?userId=${userId}`,
  profile
);
alert("Profile Saved Successfully");

}catch(err){

console.log(err);

alert("Unable To Save Profile");

}

};

return(

<div className="container py-5">

<div className="profile-card">

<h2 className="text-center mb-4">

Recruiter Profile

</h2>

<div className="text-center mb-4">

<img

src={

profile.profilePhoto ||

`https://ui-avatars.com/api/?name=${profile.firstName || "Recruiter"}&size=180`

}

className="rounded-circle"

width="180"

height="180"

alt="profile"

/>

</div>

<div className="row">

<div className="col-md-6">

<label>First Name</label>

<input
className="form-control mb-3"
name="firstName"
value={profile.firstName}
onChange={handleChange}
/>

<label>Last Name</label>

<input
className="form-control mb-3"
name="lastName"
value={profile.lastName}
onChange={handleChange}
/>

<label>Company</label>

<input
className="form-control mb-3"
name="company"
value={profile.company}
onChange={handleChange}
/>

<label>City</label>

<input
className="form-control mb-3"
name="city"
value={profile.city}
onChange={handleChange}
/>

</div>

<div className="col-md-6">
    <label>State</label>

<input
className="form-control mb-3"
name="state"
value={profile.state}
onChange={handleChange}
/>

<label>Country</label>

<input
className="form-control mb-3"
name="country"
value={profile.country}
onChange={handleChange}
/>

<label>Profile Photo URL</label>

<input
className="form-control mb-3"
name="profilePhoto"
placeholder="Paste Image URL"
value={profile.profilePhoto}
onChange={handleChange}
/>

</div>

</div>

<div className="text-center mt-4">

<button
className="btn btn-primary px-5"
onClick={saveProfile}
>

Save Profile

</button>

</div>

</div>

</div>

);

}

export default RecruiterProfile;