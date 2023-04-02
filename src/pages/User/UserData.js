import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSVLink } from 'react-csv';
import Papa from "papaparse";

export function UserData() {
    const [ans, setAns] = useState([]);
    const [ans1, setAns1] = useState('');
    const [ans2, setAns2] = useState('');
    // const [image, setImage] = useState('');
    const router = useRouter();
    // const [array, setArray] = useState([]);
    const [gender, setGender] = useState('');
    const [searchtext, setSearchtext] = useState('');
    const [status, setStatus] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [filter, setFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [dataPerPage, setdataPerPage] = useState(5);
    const [total2, setTotal] = useState(0);
    const [sortDate, setSortDate] = useState('');
    const [sortName, setSortName] = useState('');
    const allowedExtensions = ["csv"];
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState();
    const headers = [
        { label: "Code", key: "code" },
        { label: "firstName", key: "firstname" },
        { label: "lsatName", key: "lastname" },
        { label: "Email", key: "email" },
        { label: "Gender", key: "gender" },
        { label: "Hobbies", key: "hobbies" },
        { label: "Photo", key: "photo" },
        { label: "Country", key: "country" },
        { label: "Status", key: "status" },
        { label: "DateAdded", key: "dateadded" },
        { label: "DateUpdated", key: "dateupdated" },
    ];

    const CSV = (ans) => {
        let Ans = []
        ans.map((item) => {
            const json = {};
            json.code = item.code;
            json.firstname = item.firstname 
            json.lastname =  item.lastname;
            json.email = item.email;
            json.gender = item.gender;
            json.hobbies = item.hobbies;
            json.photo = item.photo;
            json.country = item.country;
            json.status = item.status1 == "Active" ? "Active" : "Inactive";
            json.dateadded = item.dateadded;
            json.dateupdated = item.dateupdated;
            Ans.push(json);
        });
        setFileData(Ans);
    };

    const CSV1 = (ans) => {
        let Ans = []
        ans.map((item) => {
            const json = {};
            json.code = item.code;
            json.firstname = item.firstname 
            json.lastname =  item.lastname;
            json.email = item.email;
            json.gender = item.gender;
            json.hobbies = item.hobbies;
            json.photo = item.photo;
            json.country = item.country;
            json.status = item.status1 == "Active" ? "Active" : "Inactive";
            json.dateadded = item.dateadded;
            json.dateupdated = item.dateupdated;
            Ans.push(json);
        });
        setFileData(Ans);
    };

    const exportcsv = async () => {
        try {
            axios.get("/api/export").then((res) => {
                const ans = res.data;
                setAns2(ans);
                CSV(ans)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const getData = async () => {
        try {
            axios.get("/api/data", { params: { searchtext: searchtext, gender: gender, status: status, hobbies: hobbies, currentPage, dataPerPage, sortDate, sortName } }).then((res) => {
                const ans = res.data;
                // console.log(ans)

                setAns(ans);
                CSV1(ans)
            })
        } catch (error) {
            console.error(error);
        }
    }

    function total() {
        axios.get("/api/status", { params: { searchtext: searchtext, gender: gender, status: status, hobbies: hobbies, currentPage, dataPerPage, sortDate, sortName } }).then((res) => {
            const ans = res.data[0].total;
            console.log(ans)
            setAns1(ans);
        })
    }



    function view(code) {
        localStorage.setItem("code", code);
        router.push('/User/ViewUser');
    }

    function edit(code) {
        localStorage.setItem("code", code);
        router.push('/User/Edituser');
    }

    const statuschange = (code, status) => {
        axios.post("/api/status", { code, status }).then((res) => {
            getData()
        })
    }

    const delete1 = (code) => {
        if (window.confirm('Are you sure you wish to delete this user') == true) {
            axios.post("/api/delete", { code }).then((res) => {
                getData()
            })
        } else {
            getData()
        }
    }

    function reset() {
        setSearchtext("")
        setGender("")
        setHobbies("")
        setStatus("")
        setSortDate("")
        setSortName("")
        axios.get("/api/data", { params: { searchtext: "", gender: "", status: "", hobbies: "", currentPage, dataPerPage, sortDate, sortName } }).then((res) => {
            const ans = res.data;
            console.log(ans)
            setAns(ans);
            CSV(ans2)
        })
        setFilter(false);
    }

    const nextbtn = () => {
        setCurrentPage(currentPage + 1);
        getData()
    }
    const backbtn = () => {
        setCurrentPage(currentPage - 1);
        getData()
    }

    const nameChange = () => {
        if (sortName == "") {
            setSortName("ASC");
            getData()
        } else if (sortName == "ASC") {
            setSortName("DESC");
            getData()
        } else {
            setSortName("ASC");
            getData()
        }
    }

    const dateChange = () => {
        if (sortDate == "") {
            setSortDate("ASC");
            getData()
        } else if (sortDate == "ASC") {
            setSortDate("DESC");
            getData()
        } else {
            setSortDate("ASC");
            getData()
        }
    }

    useEffect(() => {
        total(),
        exportcsv()
    }, []);

    useEffect(() => {
        const total1 = Math.ceil(ans1 / dataPerPage);
        // console.log(ans1)
        setTotal(total1);
    }, []);

    useEffect(() => {
        getData();
    }, [currentPage])

    

    const handleFileChange = (e) => {
        setError("");
         
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }
            setFile(inputFile);
        }
    };

   async function handleParse() {
        if (!file) return setError("Enter a valid file");
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            const res = await axios.post("/api/import",parsedData);
            console.log(res);
            const columns = Object.keys(parsedData[0]);
            setData(columns);
        };
        reader.readAsText(file);
    };

    return (
        <div>
            {filter ? <div >
                <input style={{ marginLeft: '%' }} type="text" id="search" value={searchtext} name="search" placeholder="Search Here" onChange={(e) => { setSearchtext(e.target.value) }} /> <br></br>
                <label htmlFor="gender">Gender : </label>&nbsp;
                <input id="male" type="radio" name="gender" value="male" onChange={(e) => { setGender(e.target.value) }} />
                <label htmlFor="male" className='px-2'>Male</label>&nbsp;
                <input id="female" type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                <label htmlFor="female" className='px-2' >Female</label><br></br>
                <label htmlFor="country">Status: </label>&nbsp;
                <select
                    id="status" type="text" name="status" value={status} onChange={e => { setStatus(e.target.value) }} >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <br></br>
                <label htmlFor="hobbies">Hobbies: </label>&nbsp;
                <select
                    id="hobbies" type="text" name="hobbies" value={hobbies} onChange={e => { setHobbies(e.target.value) }} >
                    <option value="All">All</option>
                    <option value="Reading">Reading</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Coding">Coding</option>
                    <option value="Drawing">Drawing</option>
                </select>
                <br></br>
                <button className='btn btn-secondary' onClick={getData}>Filter Data</button> &nbsp;
                <button className='btn btn-secondary' onClick={reset} >Reset</button>
            </div>
                :
                <button className="btn btn-secondary" onClick={() => { setFilter(true) }}>Filter</button>
            }
            
            <div>
            <label htmlFor="csvInput" >
                Enter CSV File : 
            </label>&nbsp; <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            /><button onClick={handleParse}>Import</button> <br></br>
           
                <button > {fileData?.length &&
                    <CSVLink
                        headers={headers}
                        data={fileData}
                        target="_blank"
                    >
                        Export
                    </CSVLink>
                }</button>&nbsp;<button>{fileData?.length &&
                    <CSVLink
                        headers={headers}
                        data={fileData}
                        target="_blank"
                    >
                        Export_filter
                    </CSVLink>
                }</button>
                &nbsp;
                &nbsp;
                <button ><Link href="/User/AddUser">Add User</Link></button>
            </div>
            <br></br>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Code</th>
                        <th onClick={nameChange}>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Hobbies</th>
                        <th onClick={dateChange}>Date_Added</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ans.map((item, index) => (
                            <tr key={index}>
                                <td>{item.recid}</td>
                                <td><img src={`/images/${item.photo.split('/')[item.photo.split('/').length - 1]}`} width="50px" height="50px" /></td>
                                <td>{item.code}</td>
                                <td>{item.firstname + " " + item.lastname}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td>{item.hobbies}</td>
                                <td>{item.dateadded}</td>
                                <td onClick={() => { statuschange(item.code, item.status) }} >{item.status}</td>
                                <td width='7%'><button onClick={() => { view(item.code) }}><BsFillEyeFill /></button>&nbsp;<button onClick={() => { edit(item.code) }}><MdEdit /></button>&nbsp;<button onClick={() => { delete1(item.code) }} ><FaTrashAlt /></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="pagination">
                <div style={{ marginLeft: "3%" }}>
                    {currentPage != 0 ? <button className="btn btn-secondary" onClick={backbtn}>Back</button> : <></>}
                </div>
                <div style={{ marginLeft: "86%" }}>
                    {currentPage+1==total2 ? <></> : <button onClick={nextbtn} className="btn btn-secondary" >Next</button>}
                </div>
            </div>
        </div>
    )
};