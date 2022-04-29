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

        const userMatch = await prisma.user.findFirst({
            where: {
                email: this.email
            },
            select: {
                password: true,
                id: true
            }

        });

        const passwordIsCorrect = await bcrypt.compare(this.password, userMatch.password);
        const id = userMatch.id;

        return { passwordIsCorrect, id };
    }

    async tryLogin() {
        if (await this.#verify() === 1) return response.status(400);

        const handleUser = await this.#verify();
        if(!handleUser.passwordIsCorrect) return response.status(401);
        
        const token = jwt.sign({ accessToken: handleUser.id }, process.env.TOKEN, { expiresIn: '1h' })
        return token;
    }
}