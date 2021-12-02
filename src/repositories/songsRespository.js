import connection from "../database.js";

async function createSong(name, link) {
  await connection.query(
    `INSERT INTO songs (name, "youtubeLink", score) VALUES ($1, $2, 1)`,
    [name, link]
  );
}

async function findSong(id) {
  const result = await connection.query(`SELECT * FROM songs WHERE id = $1`, [
    id,
  ]);

  return result.rows[0];
}