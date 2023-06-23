export type CreateUserParams = {
  email: string;
  password: string;
  name: string;
  birthday: Date;
  cpf: string;
  profilePicture: string;
};

export type LoginUserParams = {
  email: string;
  password: string;
};
