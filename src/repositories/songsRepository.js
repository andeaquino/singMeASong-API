import connection from "../database.js";

async function createSong(name, link) {
  await connection.query(
    `INSERT INTO songs (name, "youtubeLink", score) VALUES ($1, $2, 1);`,
    [name, link]
  );
}

async function findSong(id) {
  const result = await connection.query(`SELECT * FROM songs WHERE id = $1;`, [
    id,
  ]);

  return result.rows[0];
}

async function findRandomSong() {
  const randomSong = await connection.query(
    `SELECT * FROM songs ORDER BY random() LIMIT 1;`
  );

  const popularSong = await connection.query(
    `SELECT * FROM songs WHERE score > 10 ORDER BY random() LIMIT 1;`
  );

  const normalSong = await connection.query(
    `SELECT * FROM songs WHERE score < 11 ORDER BY random() LIMIT 1;`
  );

  return {
    popularSong: popularSong.rows,
    normalSong: normalSong.rows,
    randomSong: randomSong.rows,
  };
}

async function updateSongScore(id, score) {
  await connection.query(`UPDATE songs SET score = $1 WHERE id = $2;`, [
    score,
    id,
  ]);
}

async function deleteSong(id) {
  await connection.query(`DELETE FROM songs WHERE id = $1;`, [id]);
}

async function listTopSongs(limit) {
  let query = `SELECT * FROM songs ORDER BY "score" DESC`;
  if (limit) {
    query += ` LIMIT $1;`;
    const result = await connection.query(query, [limit]);
    return result.rows;
  }
  const result = await connection.query(query);
  return result.rows;
}

export {
  createSong,
  findSong,
  findRandomSong,
  updateSongScore,
  deleteSong,
  listTopSongs,
};
