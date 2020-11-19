import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RolesController from '../controllers/RolesController';

const rolesRouter = Router();
const rolesController = new RolesController();

rolesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      description: Joi.string(),
    },
  }),
  rolesController.index,
);

rolesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  rolesController.show,
);

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  rolesController.create,
);

rolesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  rolesController.update,
);

rolesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  rolesController.delete,
);

export default rolesRouter;
