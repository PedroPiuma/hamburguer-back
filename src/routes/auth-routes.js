import * as AuthController from "../controllers/auth-controller.js";

export default {
    login: {
        method: 'POST',
        url: '/login',
        handler: AuthController.login
    },
    signup: {
        method: 'POST',
        url: '/signup',
        handler: AuthController.signup
    }
}