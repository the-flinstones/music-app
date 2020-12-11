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
  getSongsByLanguage(album) {
    return http.get(`/api/v1/songs/album/${album}`);
  }
  getSongsByActor(album) {
    return http.get(`/api/v1/songs/actor/${album}`);
  }
  
  

}
export default new SongService();