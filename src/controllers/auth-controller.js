import { comparePassword, createAccessToken, hashPassword, prisma } from "../helpers/utils.js"

export const login = async (req, rep) => {
    try {
        const { email, password } = req.body
        let user = await prisma.user.findUnique({ where: { email } })

        if (!user) return rep.status(401).send({ error: 'E-email ou senha inválido.' })
        if (!(await comparePassword(password, user.password))) return rep.status(401).send('E-mail ou senha inválido.')

        let { password: pass, ...data } = user
        return rep.send({
            user: data,
            accessToken: await createAccessToken(data)
        })
    } catch (error) {
        rep.status(500).send({ error: 'Erro de servidor!' })
    }
}

export const signup = async (req, rep) => {
    const { firstName, lastName, email, tel, password: pass } = req.body
    try {
        const password = await hashPassword(pass)
        const { password: hashedPassword, level, ...user } = await prisma.user.create({ data: { firstName, lastName, email, tel, password } })
        rep.send(user)
    } catch (error) { rep.status(400).send({ error: 'Usuário já existente!' }) }
}