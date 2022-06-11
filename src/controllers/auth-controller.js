import { comparePassword, createAccessToken, prisma } from "../helpers/utils.js"

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