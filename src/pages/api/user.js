import DB from "../../../config/db";
const fs = require("fs");
// const fileupload = require("express-fileupload");
const moment = require('moment');

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const code = req.query.code;
        console.log(code)
        const query = `SELECT * FROM user_darshan WHERE code = "${code}"`
        const ans = await DB.queryRunner(query);
        res.send(ans)
      } catch (error) {
        console.log(error)
      }
      break;

    case "POST":
      try {
        var hobbie = "";
        var newhobiie = hobbie + req.body.hobbies;
        const date1 = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        var imgsrc = 'public/images/' + req.body.fileName
        let query = `UPDATE user_darshan SET firstname="${req.body.firstname}", lastname="${req.body.lastname}", email="${req.body.email}", gender="${req.body.gender}", hobbies="${newhobiie}", photo="${imgsrc}", country="${req.body.country}",dateupdated="${date1}" where code="${req.body.code}"`;
        const ans = await DB.queryRunner(query);
        res.send(ans)
      } catch (error) {
        console.log(error)
      }
      break;

    default:
      return res.status(400).json({ message: "bad request" });
  }
}

