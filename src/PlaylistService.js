const {Pool} = require('pg');

class PlaylistService {
  constructor() {
    this.pool = new Pool();
  }

  async getSongsPlaylist(userId) {
    console.log(userId);
    const songQuery = {
      text: `
      SELECT songs.id, songs.title, songs.performer
      FROM songs
      INNER JOIN song_to_playlist As rel
      ON rel.song_id=songs.id
      WHERE rel.playlist_id = $1`,
      values: [userId],
    };
    const playlistQuery = {
      text: `SELECT playlists.id, playlists.name
      FROM playlists
      INNER JOIN users
      ON playlists.owner = users.id
      WHERE playlists.id = $1`,
      values: [userId],
    };
    const song = await this.pool.query(songQuery);
    const playlist = await this.pool.query(playlistQuery);
    const data = playlist.rows[0];
    data.songs = song.rows;

    console.log(playlist.rows[0]);

    return {playlist: playlist.rows[0]};
  }
}

module.exports = PlaylistService;
