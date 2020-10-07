import { Router, Request, Response } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        return response.status(201).json({ id: user.id });
    } catch (err) {
        return response
            .status(400)
            .json({ error: err.message || 'Error dont expected' });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request: Request, response: Response) => {
        try {
            const uploadAvatarService = new UpdateUserAvatarService();

            const user = await uploadAvatarService.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });
            return response.status(200).json({ id: user.id });
        } catch (err) {
            return response
                .status(400)
                .json({ error: err.message || 'Error dont expected' });
        }
    },
);

export default usersRouter;
