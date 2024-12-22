import Joi from "joi";
import { typeList, minReleaseYear } from "../constants/movieConstants.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList),
    releaseYear: Joi.number().min(minReleaseYear).required().messages({
        "number.min": `Movie before ${minReleaseYear} not found`
    }),
});



export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList),
   releaseYear: Joi.number().min(minReleaseYear).required().messages({
      "number.min": `Movie before ${minReleaseYear} not found`
    }),
});
