export type CreateUserParams = {
  email: string;
  password: string;
  name: string;
  birthday: Date;
  cpf: string;
};

export type LoginUserParams = {
  email: string;
  password: string;
};
