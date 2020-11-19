import { Router } from 'express';
import examplesRouter from '@modules/examples/routes/examples.routes';
import profilesRouter from '@modules/profiles/routes/profiles.routes';
import rolesRouter from '@modules/roles/routes/roles.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/examples', examplesRouter);
routes.use('/profiles', profilesRouter);
routes.use('/roles', rolesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
