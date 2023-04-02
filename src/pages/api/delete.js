import DB from "../../../config/db";
const moment = require('moment');

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
        try {
            try{
                const date1 = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                let query = `Update user_darshan set status="Inactive", endeffdt="${date1}" where code="${req.body.code}"`;
                const ans = await DB.queryRunner(query);
                res.send(ans)
              } catch(error) {
                console.log(error);
              }
        } catch(error) {
            console.log(error)
        }

        default:
            return res.status(400).json({ message: "bad request" });
    }
}