import * as UserController from '../controllers/user-controller.js'

export default {
    getAllUsers: {
        method: 'GET',
        url: '/users',
        handler: UserController.index
    }
}