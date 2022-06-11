import { compare, genSaltSync, hash } from 'bcrypt'
import { createRequire } from 'module'
import jwt from 'jsonwebtoken'

const require = createRequire(import.meta.url)
const { PrismaClient } = require("@prisma/client")

export const envs = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT
}

export const prisma = new PrismaClient()

export const hashPassword = password => {
    let salt = genSaltSync(10)
    return new Promise((res) => hash(password, salt, (err, saltedPassword) => res(saltedPassword)))
}

export const comparePassword = (password, hashedPassword) => new Promise((res) => compare(password, hashedPassword, (err, same) => {
    if (err) res(false)
    else res(same)
}))

export const createAccessToken = data => new Promise((res, rej) => jwt.sign(data, envs.JWT_SECRET, {}, (err, token) => {
    if (err) rej(err)
    else res(token)
}))

export const verifyToken = token => new Promise((res, rej) => {
    if (!token) {
        rej('Token inválido')
        return
    }

    jwt.verify(token, envs.JWT_SECRET, {}, (err, decoded) => {
        if (err) {
            rej('Token inválido')
            return
        }
        res(decoded)
    })
})