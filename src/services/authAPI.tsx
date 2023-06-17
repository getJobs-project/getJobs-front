import { LoginUserParams } from "../utils/users";
import api from "./api";

export async function signIn(body: LoginUserParams) {
  const response = await api.post("/auth", body);
  return response.data;
}
