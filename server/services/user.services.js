import db from '../config/db';

class UserService {
  static async createUser(user) {
    const {
      email,
      first_name,
      last_name,
      password,
    } = user;
   
    const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *';
    const bindParameters = [first_name, last_name, email, password];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows[0];
  }

  static async checkUser(email) {
    const sql = 'SELECT from users WHERE email = $1';
    const bindParameters = [email];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rowCount;
  }

  static async findUser(email) {
    const sql = 'SELECT * from users WHERE email = $1';
    const bindParameters = [email];
    const client = await db.connect();
    const result = await client.query(sql, bindParameters);
    client.release();
    return result.rows;
  }
}
export default UserService;
