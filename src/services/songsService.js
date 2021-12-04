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

async function listRandomSong() {
  const songs = await songsRepository.findRandomSong();

  if (!songs.popularSong || !songs.normalSong) {
    return songs.randomSong;
  }

  const randomNumber = Math.floor(Math.random() * 10);
  if (randomNumber < 7) {
    return songs.popularSong;
  } else {
    return songs.normalSong;
  }
}

export { voteSong, listRandomSong };
