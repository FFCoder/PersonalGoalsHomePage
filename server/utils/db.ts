import * as mysql from 'mysql';
import {readFileSync} from 'fs';

const host:string = process.env.DB_HOST || 'localhost';
const user:string = process.env.DB_USER || 'root';
const password:string = process.env.DB_PASSWORD || 'root';
const database:string = process.env.DB_DATABASE || 'personal_goal_home';

const pool = mysql.createPool({
  connectionLimit : 10,
  host            : host,
  user            : user,
  password        : password,
  database        : database,
});

const initalSeedQuery = readFileSync(
    '../InitalDB.sql', 
    'utf8'
    );


pool.getConnection((err, connection) => {
    if (err) {
        console.error(err);
        return;
    }
    connection.query(initalSeedQuery, (err, results) => {
        if (err) {
        console.error(err);
        return;
        }
        console.log(results);
    }
    );
});

function RunQuery(queryString, queryParams) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            connection.query(queryString, queryParams, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    });
}

export default pool;
export {RunQuery};