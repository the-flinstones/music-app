import http from "../http-common";

class SongService{
  
 getCategories() {
    return http.get(`/api/v1/category`);
  }
  getSubCategories(categoryId) {
    return http.get(`/api/v1/subcategory/${categoryId}`);
  }
  

}
export default new SongService();