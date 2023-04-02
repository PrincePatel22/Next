import DB from "../../../config/db";
const moment = require('moment');

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {

                const ans = req.body;
                // console.log(ans);
                ans.map(async (item) => {
                    console.log('item', item)
                    let code = item.Code;

                    const ans = await DB.queryRunner(`select * from user_darshan where code="${code}"`);
                    console.log(ans.length)
                    if (ans.length > 0) {
                        let query = `UPDATE user_darshan SET firstname="${item.firstName}", lastname="${item.lastName}", email="${item.Email}", gender="${item.Gender}", hobbies="${item.Hobbies}", photo="${item.Photo}", country="${item.Country}", status="${item.Status}", dateadded="${item.DateAdded}", dateupdated="${item.DateUpdated}" where code="${item.Code}"`;
                        const ans1 = await DB.queryRunner(query);

                    } else {
                        let query = `Insert into user_darshan (code,firstname,lastname,email,gender,hobbies,photo,country,status,dateadded,dateupdated) values 
                        ("${item.Code}","${item.firstName}","${item.lastName}","${item.Email}","${item.Gender}","${item.Hobbies}","${item.Photo}","${item.Country}","${item.Status}","${item.DateAdded}","${item.DateUpdated}")`;
                        const ans1 = await DB.queryRunner(query);
                    }
                })
                res.status(200).send("data inserted")

            } catch (err) {
                console.log(err)
                res.status(400).send(err);
            }
            break;

        default:
            return res.status(400).send("Method not allowed");
    }
}