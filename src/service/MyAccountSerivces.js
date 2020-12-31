import http from "../http-common";


class MyAccountSerivces{
  
 getPlaylists() {
    return http.get(`/api/v1/playlists`);
  }
  getAccountDetailsById(userId) {
    return http.get(`/api/v1/user/${userId}`);
  }
  getAccountDetails() {
    return http.get(`/api/v1/users`);
  }
  editAccountDetailsById(userId, user) {
    return http.put(`/api/v1/user/${userId}`, user);
  }
  getAllSongsByPlaylistIdUserId(userId, playlistId) {
    return http.get(`/api/v1/playlist-songs/${userId}/${playlistId}`);
  }
  deleteAccountDetails(userId) {
    return http.delete(`/api/v1/user/${userId}`);
  }
}
export default new MyAccountSerivces();