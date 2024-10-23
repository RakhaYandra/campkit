const pool = require('../config/database');

const User = {
    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },
    createUser: async (username, email, hashedPassword, role) => {
        const query = `
            INSERT INTO users (username, email, password, role) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, username, email, role;
        `;
        const result = await pool.query(query, [username, email, hashedPassword, role]);
        return result.rows[0];
    },
};

module.exports = User;
