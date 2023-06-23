import { CreatePostParams } from "../utils/posts";
import api from "./api";

export async function getPosts(token: string) {
  const response = await api.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createPost(token: string, body: CreatePostParams) {
  const response = await api.post("/posts", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
