import { prisma } from '../helpers/utils.js'

export const index = async (req, res) => {
    try {
        let users = await prisma.user.findMany()
        return res.send({ data: { users } })
    } catch (error) {
        res.status(500).send({ error: 'Não foi possível achar usuários' })
    }
}
