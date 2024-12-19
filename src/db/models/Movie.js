import { Schema, model } from "mongoose";

const movieSchema = new Schema({
    title:{
      type:  String,
      required : true,
    },
director:{
    type:  String,
    required : true,
  },
  favorite:{
    type:Boolean,
    default:false,
    required:true,
  },
  type:{
    type:String,
    enum:["film", "serial"],
    required:true,
    default:"film"
  }
});

const MovieCollection = model("movie", movieSchema);
export default MovieCollection;
