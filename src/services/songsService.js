import * as songsRepository from "../repositories/songsRepository.js";

async function voteSong(id, type) {
  const song = await songsRepository.findSong(id);

  if (type === "upvote") {
    await songsRepository.updateSongScore(id, song.score + 1);
  } else {
    if (song.score === -5) {
      await songsRepository.deleteSong(id);
    } else {
      await songsRepository.updateSongScore(id, song.score - 1);
    }
  }
}

export { voteSong };
