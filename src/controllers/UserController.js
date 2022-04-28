import pkg from '@prisma/client'
import { response } from 'express'
import bcrypt from 'bcrypt'


const { PrismaClient } = pkg;
const prisma = new PrismaClient()

export class User {
    name
    email
    password

    constructor({ name, email, password }) {
        this.name = name;
        this.email = email;
        this.password = password;
    }


    async create() {
        const userExists = await prisma.user.findFirst({
            where: { email: this.email }
        })

        if (userExists) return response.status(406);

        const hashPassword = await bcrypt.hash(this.password, 8);

        await prisma.user.create({
            data: {
                name: this.name,
                email: this.email,
                password: hashPassword
            }
        })
        return response.status(201);
    }



}