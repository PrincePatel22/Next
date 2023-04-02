import DB from "../../../config/db";
const moment = require('moment');

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
        try {
            const date1 = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            // let query = "";
            if (req.body.status == "Active") {
                let query = `Update user_darshan set status="Inactive", dateupdated="${date1}" where code="${req.body.code}"`;
                const ans = await DB.queryRunner(query);
                res.send(ans);
            } else {
                let query = `Update user_darshan set status="Active", dateupdated="${date1}" where code="${req.body.code}"`;
                const ans = await DB.queryRunner(query);
                res.send(ans);
            }
        } catch(error) {
            console.log(error)
        }
        
        case "GET":
        try{
            let query = `select count(*) as total from user_darshan`;
            const ans = await DB.queryRunner(query);
            res.send(ans);
        } catch(error) {
            console.log(error)
        }

        default:
            return res.status(400).json({ message: "bad request" });
    }
}