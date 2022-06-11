import { hashPassword, prisma } from '../src/helpers/utils.js'

const userData = [
    {
        firstName: 'admin',
        lastName: 'developer',
        email: 'luisppiuma@gmail.com',
        tel: '(53)98111-9556',
        password: 'hamburguerappproject@piuma.0123456789'
    },
    {
        firstName: 'Proprietário',
        lastName: 'Hamburgueria',
        email: 'email@example.com',
        tel: '(00)0000-0000',
        password: '123456789'
    },
]

const main = async () => {
    console.log('Iniciando seeding ...')
    let users = await prisma.user.findMany({ select: { email: true } })

    for (const u of userData) {
        const hashedPassword = await hashPassword(u.password)
        const userData = { ...u, password: hashedPassword }
        const user = await prisma.user.create({ data: userData })
        console.log(`Usuário criado com id: ${user.id}`)
    }
    console.log('Seeding finalizado.')
}

main()
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => await prisma.$disconnect())