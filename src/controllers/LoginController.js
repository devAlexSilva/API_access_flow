import { response } from 'express'
import { prisma } from '../prisma/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export class Login {
    email
    password

    constructor({ email, password }) {
        this.email = email;
        this.password = password
    }


    async #verify() {
        if (this.email == null || this.password == null) return 1;

        if (this.password.length < 6) return 1;

        const hashPassword = await bcrypt.compare(this.password, 8);

        const userMatch = await prisma.user.findFirst({
            where: {
                email: this.email,
                password: hashPassword
            },
            select: {
                id: true,
                name: true
            }

        });

        return userMatch;
    }

    async tryLogin() {
        if (await this.#verify() === 1) return response.status(400);

        const { id } = await this.#verify();
        return console.log(id)
        
    }
}