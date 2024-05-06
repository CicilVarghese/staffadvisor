const { query } = require('../db/database');

function doLogin(userData) {
    const sql = `
        SELECT u.*, r.role_name
        FROM users u
        JOIN user_roles ur ON u.userid = ur.user_id
        JOIN roles r ON ur.role_id = r.role_id
        WHERE u.userid = ? AND u.password = ?`;
    const values = [userData.userid, userData.password]; // Define the values array

    return new Promise((resolve, reject) => {
        query(sql, values)
            .then(({ results }) => {
                console.log("Executing query:", sql, values);
                console.log("Results:", results); // Add logging for results

                if (results.length > 0) {
                    const user = {
                        userid: results[0].userid,
                        password: results[0].password,
                        roles: results.map(row => row.role_name)
                    };
                    console.log("Login success. User:", user); // Add logging for user
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
