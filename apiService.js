import api from "../../axiosConfig";
import { API_ENDPOINTS } from "../endpoints";


export const getPosts = async () => {
  try {
    let res = await api.get(API_ENDPOINTS.GET_POSTS);
    return res;
  } catch (error) {
    console.log(error)   
}
}

export const delPosts = async (id) => {
  try {
    let res = await api.delete(`${API_ENDPOINTS.DELETE_POSTS}/id=${id}`);
    return res;
  } catch (error) {
    console.log(error)   
}
}

export const updatePosts = async (id,body) => {
  try {
    let res = await api.patch(`${API_ENDPOINTS.UPDATE_POSTS}/id=${id}`,body);
    return res;
  } catch (error) {
    console.log(error)
  }
}

export const createPosts = async() => {
  try {
    let res = await api.post(`${API_ENDPOINTS.CREATE_POSTS}`, body)
    return res;

  } catch (error) {
    console.log(error);
  }
}


