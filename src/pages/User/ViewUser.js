import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ViewUser() {
    const [ans, setAns] = useState([]);
    const [image, setImage] = useState('');
    const ISSERVER = typeof window === "undefined";
    const router = useRouter();
    function viewData() {
        if (!ISSERVER) {
            const code = localStorage.getItem("code");
            axios.get("/api/user", { params: { code } }).then((res) => {
                const ans = res.data[0];
                console.log(res.data)
                let image = ans.photo.split('/');
                setImage(image[image.length - 1]);
                setAns(ans);
            })
        }
    }

    function back() {
        localStorage.clear();
        router.push('/');
    }

    useEffect(() => {
        viewData()
    }, []);

    return (
        <div className="form" >
            <div className='form1'>
                <br></br>
                <h1 >View User</h1>
                <img class='circular_image' src={`/images/${image}`} alt={image} height="150px" width="160px" border-radius="50%" />
                <br></br>
                <br></br>
                <form >
                    <div className="form-group">
                        <label htmlFor="code"><b> Code : </b>{ans.code}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname"><b> Name : </b>{ans.firstname + " " + ans.lastname}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"><b>Email : </b>{ans.email}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender"><b>Gender : </b>{ans.gender}</label>&nbsp;
                    </div>

                    <div>
                        <label htmlFor="hobbies"><b>Hobbies : </b>{ans.hobbies}</label> &nbsp;
                    </div>

                    <div className="form-group">
                        <label htmlFor="country"><b>Country : </b>{ans.country}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status"><b>Status : </b>{ans.status}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateadded"><b>Date Added : </b>{ans.dateadded}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateupdated"><b>Date Updated : </b>{ans.dateupdated}</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="daatedeleted"><b>Date Deleted : </b>{ans.endeffdt}</label>
                    </div>
                    <br></br>
                    <div className='back'>
                    <button onClick={back} className="btn btn-danger">Back</button>
                    </div>

                </form>
                <br></br>
            </div>
        </div>
    )
}

export default ViewUser;