import http from "../http-common";
import axios from 'axios'

const API_URL = 'http://localhost:8081/music-auth'

class MyAccountSerivces{
  
 getPlaylists() {
    return http.get(`/api/v1/playlists`);
  }
  getAccountDetailsByEmail(email) {
    return axios.get(`${API_URL}/user-email/${email}`);
  }
  getAccountDetails() {
    return axios.get(`${API_URL}/users`);
  }
  editAccountDetailsById(email, user) {
    return axios.put(`${API_URL}/user/${email}`, user);
  }
  getAllSongsByPlaylistIdUserId(userId, playlistId) {
    return http.get(`/api/v1/playlist-songs/${userId}/{playlistId}?playlistId=${playlistId}`);
  }
  deleteAccountDetails(email) {
    return axios.delete(`${API_URL}/user/${email}`);
  }

  getPlaylistsById(userId) {
    return http.get(`/api/v1/playlist/${userId}`);
  }
}
export default new MyAccountSerivces();