import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ExamplesController from '../controllers/ExamplesController';
import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated';
import hasRoles from '@modules/users/middlewares/hasRoles';

const examplesRouter = Router();
const examplesController = new ExamplesController();

examplesRouter.use(ensureAuthenticated);
examplesRouter.use(hasRoles(['ROLE_EXAMPLE']));

examplesRouter.get(
  '/',
  hasRoles(['ROLE_EXAMPLE_LIST']),
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      email: Joi.string(),
    },
  }),
  examplesController.index,
);

examplesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  examplesController.show,
);

examplesRouter.post(
  '/',
  hasRoles(['ROLE_EXAMPLE_CREATE']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
  }),
  examplesController.create,
);

examplesRouter.put(
  '/:id',
  hasRoles(['ROLE_EXAMPLE_UPDATE']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  examplesController.update,
);

examplesRouter.delete(
  '/:id',
  hasRoles(['ROLE_EXAMPLE_DELETE']),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  examplesController.delete,
);

export default examplesRouter;
