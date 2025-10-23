export type Course = {
  title: string;
  description: string;
  image: { url: string; alt: string };
  instructor: {
    name: string;
    title: string;
    company: string;
    imageUrl: string;
  };
  price: {
    original: number;
    discounted: number;
  };
  rating: {
    average: number;
    ratingCount: number;
  };
};

export type User = {
  id: string;
  email: string;
  password: string;
  phoneCountry: string;
  phoneNumber: string;
  fullname: string;
};

export type CreateUserInput = Omit<User, "id"> & { confirmPassword: string };
export type UpdateUserInput = Partial<CreateUserInput>;

export type Session = {
  user: User;
  token: string; // fake token
};
