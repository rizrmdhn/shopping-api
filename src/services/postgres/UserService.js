const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
    constructor() {
        this._pool = new Pool();
    }

    async addUser({ email, password, fullname }) {

        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
            values: [id, email, hashedPassword, fullname],
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('User gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async verifyNewUsername(username) {

        const query = {
            text: 'SELECT username FROM users WHERE username = $1',
            values: [username],
        }

        const result = await this._pool.query(query);

        if (result.rowCount > 0) {
            throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
        }
    }


    async verifyNewEmail(email) {

        const query = {
            text: 'SELECT email FROM users WHERE email = $1',
            values: [email],
        }

        const result = await this._pool.query(query);

        if (result.rowCount > 0) {
            throw new InvariantError('Gagal menambahkan user. Email sudah digunakan.');
        }
    }

    async getUserById(userId) {

        const query = {
            text: 'SELECT id, username, fullname FROM users WHERE id = $1',
            values: [userId],
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('User tidak ditemukan');
        }

        return result.rows[0];
    }

    async verifyUserCredential(email, password) {

        const query = {
            text: 'SELECT id, password FROM users WHERE email = $1',
            values: [email],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new AuthenticationError('Email yang Anda berikan salah');
        }


        const { id, password: hashedPassword } = result.rows[0];

        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new AuthenticationError('Password yang Anda berikan salah');
        }

        return id;
    }

    async getUsersByEmail(email) {

        const query = {
            text: 'SELECT id, email, fullname FROM users WHERE email LIKE $1',
            values: [`%${email}%`],
        };

        const result = await this._pool.query(query);

        return result.rows;
    }
}

module.exports = UsersService;