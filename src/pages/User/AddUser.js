import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

 function AddUser() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState([]);
    // const [photo, setPhoto] = useState('');
    const [country, setCountry] = useState('');
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState("");
    const pattern = new RegExp(/[A-Za-z]{3}[0-9]{3}/);
    const validate = new RegExp(/\S+@\S+\.\S+/);
    const router = useRouter();
    

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    function getHobbies(e) {
        const { value, checked } = e.target
        if (checked) {
            setHobbies([...hobbies, value])
        }
        else {
            setHobbies(hobbies.filter((e) => e !== value))
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (code == "") {
            alert("Enter Code")
        } else if (!pattern.test(code)) {
            alert("Enter valid code")
        } else if (code.length > 6 || code.length < 6) {
            alert("Enter the 6 digits Code")
        } else if (firstname == "") {
            alert("Enter First name")
        } else if (lastname == "") {
            alert("Enter Last name")
        } else if (email == "") {
            alert("Enter the email address")
        } else if (!validate.test(email)) {
            alert("Enter valid email address")
        } else if (gender == "") {
            alert("Please select your gender")
        } else if (hobbies == "") {
            alert("Please select your hobbies")
        } else if (country == "") {
            alert("Please select the country")
        }
        else {
            const formData = new FormData();
            formData.append("file", file);
            console.log(formData);
            formData.append("fileName", fileName);
            axios.post("/api/image", formData).then((res) => {
            });

            axios.post("/api/data", { code, firstname, lastname, gender, hobbies, email, country, fileName }).then((res) => {
            });
            router.push('/');
        }
      
    }

    return (
        <div>
            <center>
                <h1>Add User</h1>
            </center>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input type="text" className="form-control" id="code" value={code} placeholder="Enter Code (Format : USR001,USR002 )" onChange={(e) => { setCode(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" id="firstname" value={firstname} placeholder="Enter First Name" onChange={(e) => { setFirstname(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" value={lastname} placeholder="Enter last Name" onChange={(e) => { setLastname(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" value={email} placeholder="Enter Email Address" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="gender">Gender: </label>&nbsp;
                    <input
                        id="male"
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => { setGender(e.target.value) }}
                        checked={gender == "male" ? "true" : null}
                    />
                    <label htmlFor="male" className='px-2'>Male</label>
                    &nbsp;
                    <input
                        id="female"
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                        checked={gender == "female" ? "true" : null}
                    />
                    <label htmlFor="female" className='px-2'>Female</label>
                </div>
                <br></br>
                <div>
                    <label htmlFor="hobbies">Hobbies: </label> &nbsp;
                    <input id="Reading" type="checkbox" name="Reading" value="Reading" onChange={getHobbies} />&nbsp;
                    <label htmlFor="Reading">Reading</label>  &nbsp;&nbsp;
                    <input id="Gaming" type="checkbox" name="Gaming" value="Gaming" onChange={getHobbies} />&nbsp;
                    <label htmlFor="Gaming">Gaming</label> &nbsp;&nbsp;
                    <input id="Coding" type="checkbox" name="Coding" value="Coding" onChange={getHobbies} />&nbsp;
                    <label htmlFor="Coding">Coding</label> &nbsp;&nbsp;
                    <input id="Drawing" type="checkbox" name="Drawing" value="Drawing" onChange={getHobbies} />&nbsp;
                    <label htmlFor="Drawing">Drawing</label> &nbsp;
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="photo">Select Image :</label>
                    <input type="file" name="file"  accept='image/*' onChange={saveFile}/>
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                        id="country" className="form-select form-select-sm"
                        type="text"
                        name="country"
                        value={country}
                        onChange={e => {
                            setCountry(e.target.value)
                        }} >
                        <option value="select" >--select--</option>
                        <option value="india">India</option>
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                    </select>
                </div>
                <br></br>
                <input type="submit" className="btn btn-primary" value="Submit" /> &nbsp;
                <button className="btn btn-danger"><Link href="/">Back</Link></button>
            </form>
        </div>
    )
}

export default AddUser;