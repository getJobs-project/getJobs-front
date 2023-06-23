export type CreatePostParams = {
  text: string;
  imageUrl: string;
  location: string;
};

export type Post = {
  id: number;
  text: string;
  imageUrl: string;
  location: string;
  updatedAt: string;
  userId: number;
  User: {
    profilePicture: string;
    name: string;
  };
};
