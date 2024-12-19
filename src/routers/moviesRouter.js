

import {Router} from "express";
import * as  moviesController  from "../controllers/moviesController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(moviesController.getMoviesController));

moviesRouter.get("/:id", ctrlWrapper(moviesController.getMovieByIdController));

moviesRouter.post("/", ctrlWrapper(moviesController.addMovieController));

moviesRouter.put("/:id", ctrlWrapper(moviesController.upsertMovieController));

moviesRouter.patch("/:id", ctrlWrapper(moviesController.patchMovieController));

moviesRouter.delete("/:id", ctrlWrapper(moviesController.deleteMovieController));

export default moviesRouter;
