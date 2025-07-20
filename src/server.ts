import {createServer} from "node:http";

export const launchServer = () => {
    const userController:UserController = new UserController(userService)

    createServer(async (req, res) => {
        await userRouters(req, res, userController)
    }).listen(3005, () => {
        console.log('UserServer runs at htpp://localhost:3005')
    })
}