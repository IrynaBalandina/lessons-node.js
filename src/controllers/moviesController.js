import * as movieServices from "../services/movies.js";
import createError from "http-errors";


export const getMoviesController = async (req, res)=> {
    const data = await movieServices.getMovies();

    res.json({
        status: 200,
        messsage: "Successfully found movies",
        data,
    });
};

export const getMovieByIdController = async(req, res)=> {
    const {id} = req.params;

    const data = await movieServices.getMovieById(id);

    if(!data) {
        throw createError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Successfully find movie with id=${id}`,
        data,
    });
};

export const addMovieController = async(req, res)=> {
    const data = await movieServices.addMovie(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully add movie",
        data,
    });
};

export const upsertMovieController = async(req, res)=> {
    const {id} = req.params;
    const {isNew, data} = await movieServices.updateMovie(id, req.body, {upsert: true});

    const status = isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: "Successfully upsert movie",
        data,
    });
};

export const patchMovieController = async(req, res)=> {
    const {id} = req.params;
    const result = await movieServices.updateMovie(id, req.body);

    if(!result) {
        throw createError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: "Successfully upsert movie",
        data: result.data,
    });
};

export const deleteMovieController = async(req, res)=> {
    const {id} = req.params;
    const data = await movieServices.deleteMovie({_id: id});

    if(!data) {
        throw createError(404, `Movie with id=${id} not found`);
    }

    res.status(204).send();
};
