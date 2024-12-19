import MovieCollection from "../db/models/Movie.js";

export const getMovies = ()=> MovieCollection.find();

export const getMovieById = id => MovieCollection.findById(id);

export const addMovie = payload => MovieCollection.create(payload);

export const updateMovie = async (_id, payload, options = {}) => {
    const {upsert = false} = options;
    const result = await MovieCollection.findOneAndUpdate({_id}, payload, {
        new: true,
        upsert,
        includeResultMetadata: true,
    });

    if(!result || !result.value) return null;

    const isNew = Boolean(result.lastErrorObject.upserted);

    return {
        isNew,
        data: result.value,
    };
};

export const deleteMovie = filter => MovieCollection.findOneAndDelete(filter);
