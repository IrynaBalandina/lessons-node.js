

import {Router} from "express";
import * as  moviesController  from "../controllers/moviesController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { movieAddSchema, movieUpdateSchema } from "../validation/movieSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(moviesController.getMoviesController));

moviesRouter.get("/:id",isValidId,  ctrlWrapper(moviesController.getMovieByIdController));

moviesRouter.post("/",ctrlWrapper(moviesController.addMovieController));

moviesRouter.put("/:id",isValidId,  validateBody(movieAddSchema), ctrlWrapper(moviesController.upsertMovieController));

moviesRouter.patch("/:id",isValidId,   validateBody(movieUpdateSchema), ctrlWrapper(moviesController.patchMovieController));

moviesRouter.delete("/:id",isValidId, ctrlWrapper(moviesController.deleteMovieController));

export default moviesRouter;
