import DB from "../../../config/db";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const results = await DB.queryRunner(`select * from user_darshan`);
                res.send(results)
            } catch (error) {
                return error;
            }
            break;

        default:
            return res.status(400).send("Method not allowed");
            
    }
}