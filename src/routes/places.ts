import { Router } from 'express';
import { placesController } from '../controllers/places';

const placesRouter = Router();

placesRouter.get("/", placesController)

export default placesRouter;