import axios from "axios";

export const fetchPost = async (formData) =>
  (await axios.post('/api/posts', formData)).data;

export const fetchPosts = async (page = 1, limit = 10) =>
  (await axios.get('/api/posts', { params: { page, limit } })).data;