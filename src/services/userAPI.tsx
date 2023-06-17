import { CreateUserParams } from "../utils/users";
import api from "./api";

export async function signUp(body: CreateUserParams) {
  const response = await api.post("/users", body);
  return response.data;
}