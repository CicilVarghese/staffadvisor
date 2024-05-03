const { query } = require('../db/database');

function doLogin(userData) {
    const sql = 'SELECT * FROM users WHERE userid = ? AND password = ?';
    const values = [userData.userid, userData.password];
  
    return new Promise((resolve, reject) => {
        query(sql, values)
            .then(({ results }) => {
                console.log("Executing query:", sql, values);

                if (results.length > 0) {
                    const user = results[0];
                    console.log("Login success");
                    resolve({ status: true, user: user });
                } else {
                    console.log("Login failed: User not found or incorrect userid/password");
                    resolve({ status: false });
                }
            })
            .catch((error) => {
                console.error("Error fetching user from database:", error);
                reject(error);
            });
    });
}

module.exports = {
    doLogin
};
