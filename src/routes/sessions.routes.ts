import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        const authenticate = new AuthenticateUserService();

        const { user, token } = await authenticate.execute({
            email,
            password,
        });

        const userWithoutPassword = {
            ...user,
            password: undefined,
        };

        return response.status(200).json({ user: userWithoutPassword, token });
    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message || 'Error dont expected' });
    }
});

export default usersRouter;
