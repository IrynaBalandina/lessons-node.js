import * as movieServices from "../services/movies.js";
import createError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { sortByList } from "../db/models/Movie.js";
import { parseMovieFilterParams } from "../utils/filters/parseMovieFilterParams.js";
import {saveFileToUploadsDir} from "../utils/saveFileToUploadsDir.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { getEnvVar } from "../utils/getEnvVar.js";

export const getMoviesController = async (req, res)=> {
    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query, sortByList);
    const filter = parseMovieFilterParams(req.query);
    filter.userId = req.user._id;

    const data = await movieServices.getMovies({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter
    });

    res.json({
        status: 200,
        messsage: "Successfully found movies",
        data,
    });
};

export const getMovieByIdController = async(req, res)=> {
 const {_id: userId} = req.user;
    const {id: _id} = req.params;

    const data = await movieServices.getMovie({_id, userId});

    if(!data) {
        throw createError(404, `Movie with id=${_id} not found`);
    }

    res.json({
        status: 200,
        message: `Successfully find movie with id=${_id}`,
        data,
    });
};

export const addMovieController = async(req, res)=> {
    const cloudinaryEnable = getEnvVar("CLOUDINARY_ENABLE") === "true";
    let poster;
    if(req.file) {
        if(cloudinaryEnable) {
            poster = await saveFileToCloudinary(req.file);
        }
        else {
            poster = await saveFileToUploadsDir(req.file);
        }
    }
   const {_id: userId} = req.user;
 const data = await movieServices.addMovie({...req.body, poster, userId});

    res.status(201).json({
        status: 201,
        message: "Successfully add movie",
        data,
    });
};

export const upsertMovieController = async(req, res)=> {
    const {id} = req.params;
    const {_id: userId} = req.user;
    const {isNew, data} = await movieServices.updateMovie(id, {...req.body, userId}, {upsert: true});

    const status = isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: "Successfully upsert movie",
        data,
    });
};

export const patchMovieController = async(req, res)=> {
    const {id: _id} = req.params;
    const {_id: userId} = req.user;
    const result = await movieServices.updateMovie({_id, userId}, req.body);

    if(!result) {
        throw createError(404, `Movie with id=${_id} not found`);
    }

    res.json({
        status: 200,
        message: "Successfully upsert movie",
        data: result.data,
    });
};
export const deleteMovieController = async(req, res)=> {
    const {id: _id} = req.params;
    const {_id: userId} = req.user;
    const data = await movieServices.deleteMovie({_id, userId});

    if(!data) {
        throw createError(404, `Movie with id=${_id} not found`);
    }

    res.status(204).send();
};
