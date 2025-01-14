

import {Router} from "express";
import * as  moviesController  from "../controllers/moviesController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { movieAddSchema, movieUpdateSchema } from "../validation/movieSchema.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";


const moviesRouter = Router();
moviesRouter.use(authenticate);

moviesRouter.get("/", ctrlWrapper(moviesController.getMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(moviesController.getMovieByIdController));

// upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 4}])
// upload.array("poster", 8)

moviesRouter.post("/", upload.single("poster"), validateBody(movieAddSchema), ctrlWrapper(moviesController.addMovieController));

moviesRouter.put("/:id", isValidId, validateBody(movieAddSchema), ctrlWrapper(moviesController.upsertMovieController));

moviesRouter.patch("/:id", isValidId, validateBody(movieUpdateSchema), ctrlWrapper(moviesController.patchMovieController));

moviesRouter.delete("/:id", isValidId, ctrlWrapper(moviesController.deleteMovieController));

export default moviesRouter;
