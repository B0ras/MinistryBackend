import { Router } from 'express';
import { placesController } from '../controllers/places';
import { hasRole } from '../middleware/authorization';

const placesRouter = Router();

placesRouter.get("/", hasRole([1, 2]), placesController)

export default placesRouter;