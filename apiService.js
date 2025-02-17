import api from "../../axiosConfig";
import { API_ENDPOINTS } from "../endpoints";
import { toast } from 'react-toastify'


//get (read) api
export const getPosts = async (userId = 1) => {
  try {
    let res = await api.get(`${API_ENDPOINTS.GET_POSTS}?userId=${userId}`);    //only user id 1 data is fetched
    return res;
  } catch (error) {
    console.log(error)   
}
}

//delete api
export const delPosts = async (id) => {
  try {
    let res = await api.delete(`${API_ENDPOINTS.DELETE_POSTS}/${id}`);
    return res;
  } catch (error) {
    console.log(error)   
}
}

//update api
export const updatePosts = async (id,body) => {
  try {
    let res = await api.patch(`${API_ENDPOINTS.UPDATE_POSTS}/${id}`,body);
    toast.success("Item updated successfully! 🎉");
    return res;
  } catch (error) {
    toast.error("Failed to update item. Please try again.");
    console.log(error)
  }
}

//create api
export const createPosts = async(tableId,body) => {
  try {
    let res = await api.post(`${API_ENDPOINTS.CREATE_POSTS}`, body)
    return res;

  } catch (error) {
    console.log(error);
  }
}


