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


    async #verifyDataUser() {
        if (this.email == null || this.password == null) return 'invalid';

        if (this.password.length < 6) return 'invalid';

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
        try {
            if (await this.#verifyDataUser() === 'invalid') return response.status(400);

            const handleUser = await this.#verifyDataUser();
            if (!handleUser.passwordIsCorrect) return response.status(401);

            const token = jwt.sign({ accessToken: handleUser.id }, process.env.TOKEN, { expiresIn: '1h' })
            return token;
    
        } catch {
            return response.status(400);
        }
    }
}