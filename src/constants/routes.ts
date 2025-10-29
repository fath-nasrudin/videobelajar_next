export const ROUTES = {
  home: { path: "/", label: "Home" },
  login: { path: "/login", label: "Login" },
  courses: {
    path: "/courses",
    label: "Courses",
    detail: (id: string) => `/courses/${id}`,
  },
  paymentOptions: {
    path: "/payment",
  },
  paymentConfirmation: {
    path: "/payment/payment",
  },
  paymentChangeMethod: {
    path: "/payment/change-method",
  },
};
