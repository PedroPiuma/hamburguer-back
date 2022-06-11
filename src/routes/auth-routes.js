import * as AuthController from "../controllers/auth-controller.js";

export default {
    signup: {
        method: 'POST',
        url: '/login',
        handler: AuthController.login
    }
}