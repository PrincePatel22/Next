import DB from "../../../config/db";
const fs = require("fs");
// const fileupload = require("express-fileupload");
const moment = require('moment');

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                let text = req.query.searchtext;
                let gender = req.query.gender;
                let status = req.query.status;
                let hobbies = req.query.hobbies;
                let currentPage = req.query.currentPage;
                let dataPerPage = req.query.dataPerPage;
                let skipdata = currentPage * dataPerPage;
                let sortDate = req.query.sortDate;
                let sortName = req.query.sortName;
                let query = "";
                if (text != "") {
                    query = `code like "%${text}%" or firstname like "%${text}%" or lastname like "%${text}%" or email like "%${text}%"`;
                }
                if (gender != "") {
                    if (query != "") {
                        query = query + ` and gender="${gender}" `;
                    } else {
                        query = `gender="${gender}"`;
                    }
                }

                if (status != "") {
                    if (query != "") {
                        query = query + ` and status="${status}" `
                    } else {
                        query = `status="${status}"`;
                    }
                }
                if (hobbies != "") {
                    if (query != "") {
                        query = query + ` and (hobbies like "%${hobbies}%") `
                    } else {
                        query = `(hobbies like "%${hobbies}%") `
                    }
                }

                let order = "";
                if (sortName != "" && sortDate != "") {
                    order = ` order by firstname ${sortName}, dateadded ${sortDate} `;
                } else if (sortName != "") {
                    order = ` order by firstname ${sortName} `;
                } else if (sortDate != "") {
                    order = `order by dateadded ${sortDate} `;
                }
                if (query != "") {
                    query = ` where ` + query;
                }
                query = query+order;
                const results = await DB.queryRunner(`select * from user_darshan` + query + ` limit ${skipdata},${dataPerPage}`);
                res.send(results)
            } catch (error) {
                return error;
            }
            break;

        case "POST":
            try {
                console.log(req.body);
                var hobbie = "";
                var newhobiie = hobbie + req.body.hobbies;
                const date1 = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                var imgsrc = 'public/images/' + req.body.fileName
                let query = `Insert into user_darshan (code,firstname,lastname,email,gender,hobbies,photo,country,status,dateadded) values 
                ("${req.body.code}","${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.gender}","${newhobiie}","${imgsrc}","${req.body.country}","Active","${date1}")`;

                const results =await DB.queryRunner(query);

            } catch (error) {
                console.log(error)
            }
            break;

        default:
            return res.status(400).send("Method not allowed");
    }
}

