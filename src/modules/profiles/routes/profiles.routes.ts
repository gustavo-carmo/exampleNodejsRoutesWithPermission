import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfilesController from '../controllers/ProfilesController';

const profilesRouter = Router();
const profilesController = new ProfilesController();

profilesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      description: Joi.string(),
    },
  }),
  profilesController.index,
);

profilesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  profilesController.show,
);

profilesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required().description(),
    },
  }),
  profilesController.create,
);

profilesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required().description(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  profilesController.update,
);

profilesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  profilesController.delete,
);

export default profilesRouter;
