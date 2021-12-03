import express from "express";
import * as songsController from "./controllers/songsController.js";

const routes = express.Router();

routes.post("/recommendations", songsController.postSong);

export default routes;
