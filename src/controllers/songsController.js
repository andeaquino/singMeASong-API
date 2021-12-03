import * as songsRepository from "../repositories/songsRespository.js";
import { songSchema } from "../schemas/songSchema.js";

async function postSong(req, res) {
  const { name, youtubeLink } = req.body;

  if (songSchema.validate({ name, youtubeLink }).error) {
    return res.sendStatus(403);
  }

  try {
    await songsRepository.createSong(name, youtubeLink);

    return res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export { postSong };
