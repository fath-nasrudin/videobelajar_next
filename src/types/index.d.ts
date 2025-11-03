export type Module = {
  title: string;
  materials: {
    title: string;
    type: "video";
    duration: string;
  }[];
};

export type Reviewer = {
  account: {
    id: string;
    name: string;
    status: string;
    profileUrl: string;
  };
  text: string;
  rating: number;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  image: { url: string; alt: string };
  instructors: Instructor[];
  price: {
    original: number;
    discounted: number;
    discount_percentage: number;
  };
  rating: {
    average: number;
    ratingCount: number;
  };
  modules: Module[];
  reviews: Reviewer[];
  features: {
    title: string;
    items: { iconUrl: string; text: string }[];
  }[];
};

export type User = {
  id: string;
  email: string;
  password: string;
  phoneCountry: string;
  phoneNumber: string;
  fullname: string;
};

export type Instructor = {
  id: string;
  name: string;
  position: string;
  company: string;
  description: string;
  profileUrl: string;
};

export type Order = {
  id: string;
  courseId: string;
  course?: Course;
  userId: string;
  status: "pending" | "cancelled" | "success" | "waiting_payment";
  invoice: string;
  totalPayment: number;
  paidAt?: string;
};

export type CreateOrderInput = Pick<
  Order,
  "userId" | "courseId" | "totalPayment"
>;
export type UpdateOrderInput = Partial<Omit<Order, "id">>;

export type Payment = {
  id: string;
  orderId: string;
  paymentMethodId: string;
  status: "pending" | "cancelled" | "success" | "waiting_payment";
};

export type PaymentMethod = {
  id: string;
  name: string;
  code: string;
  type: "bank_transfer" | "ewallet" | "credit_debit_card";
  image: {
    url: string;
  };
};

export type CreateUserInput = Omit<User, "id"> & { confirmPassword: string };
export type UpdateUserInput = Partial<CreateUserInput>;

export type Session = {
  user: User;
  token: string; // fake token
};
