import * as songsRepository from "../repositories/songsRepository.js";
import * as songsService from "../services/songsService.js";
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

async function upvoteSong(req, res) {
  const { id } = req.params;

  try {
    await songsService.voteSong(id, "upvote");

    return res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
}

async function downvoteSong(req, res) {
  const { id } = req.params;

  try {
    await songsService.voteSong(id, "downvote");

    return res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
}

async function listTopSongs(req, res) {
  const { amount } = req.params;

  try {
    const songs = await songsRepository.listTopSongs(amount);
    res.send(songs);
  } catch {
    res.sendStatus(500);
  }
}

async function listRandomSong(req, res) {
  try {
    const song = await songsRepository.listRandomSong();

    if (!song) return res.sendStatus(404);

    return res.send(song);
  } catch {
    res.sendStatus(500);
  }
}

export { postSong, upvoteSong, downvoteSong, listTopSongs };
