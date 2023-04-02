// const mysql = require("mysql"); 
// const con = mysql.createConnection({
//   host: "192.168.2.8", 
//   user: "trainee", 
//   password: "trainee@123", 
//   database: "trainee", 
//   timezone: 'utc' //<-- here
// }); 

const mysql = require('serverless-mysql')({
  config: {
    host: "192.168.2.8",
    database: "trainee",
    user: "trainee",
    password: "trainee@123",
    timezone: 'utc' //<-- here 
  }
})

// const queryRunner = (query) => {
//       return new Promise((resolve, reject) => {
//         con.query(query, (err, result) => {
//           if (err) return reject(err);
//           resolve(result);
//         });
//       });
//     };

const queryRunner = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let results = await mysql.query(query)
      await mysql.end()
      resolve(results);
    } catch (err) {
      reject(err);
    }
  });
};
export default { queryRunner };