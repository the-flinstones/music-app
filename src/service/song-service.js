import http from "../http-common";

class SongService{
  
 getCategories() {
    return http.get(`/api/v1/category`);
  }
  getSubCategories(categoryId) {
    return http.get(`/api/v1/subcategory/${categoryId}`);
  }
  getSongsByArtist(artist) {
    return http.get(`/api/v1/songs/artist/${artist}`);
  }
  getSongsByMood(genre) {
    return http.get(`/api/v1/songs/genre/${genre}`);
  }
  getSongsByLanguage(language) {
    return http.get(`/api/v1/songs/lang/${language}`);
  }
  
  getSongsByActor(album) {
    return http.get(`/api/v1/songs/actor/${album}`);
  }
  
  getRecentsByUserId(userId){
    return http.get(`/api/v1/user/recent/${userId}`);
  }
  postRecentsByUserId(userId,recentlyPlayedSongs){
    return http.post(`/api/v1/user/recent/${userId}`,recentlyPlayedSongs);
  }
  ifSongExistsInLikedSongsList(userId,songId){
    return http.get(`/user/liked/${userId}/${songId}`);
  }
  getLikedByUserId(userId){
    return http.get(`/user/liked/${userId}`);
  }
  postLikedByUserId(userId,liked){
    return http.post(`/user/liked/liked/${userId}`,liked);
  }

  addLikedByUserId(userId,song){
    return http.post(`/user/liked/song/${userId}`,song);
  }
  

}
export default new SongService();