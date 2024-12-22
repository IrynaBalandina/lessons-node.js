import { Schema, model } from "mongoose";
import { typeList, minReleaseYear } from "../../constants/movieConstants.js";
import { handleSaveError,setUpdateSettings } from "./hook.js";

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
 releaseYear:{
    type:Number,
    min:minReleaseYear,
    required:true,

  },
  type:{
    type:String,
    enum:typeList,
    required:true,
    default:"film"
  }
});
movieSchema.post("save", handleSaveError);

movieSchema.pre("findOneAndUpdate", setUpdateSettings);
movieSchema.post("findOneAndUpdate", handleSaveError);
export const sortByList = ["_id", "title", "director", "favorite", "type", "releaseYear"];
const MovieCollection = model("movie", movieSchema);
export default MovieCollection;
