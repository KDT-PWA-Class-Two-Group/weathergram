import axios from "axios";

export const fetchPost = async (formData) =>
  (await axios.post('/api/posts', formData)).data;

export const fetchPosts = async (page = 1, limit = 10) =>
  (await axios.get('/api/posts', { params: { page, limit } })).data;

export const deletePost = async (postId) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 삭제 실패", err);
    throw err;
  }
};