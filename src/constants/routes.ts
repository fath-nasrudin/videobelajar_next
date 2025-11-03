export const ROUTES = {
  home: { path: "/", label: "Home" },
  login: { path: "/login", label: "Login" },
  courses: {
    path: "/courses",
    label: "Courses",
    detail: (id: string) => `/courses/${id}`,
  },

  payment: {
    methods: {
      getPath: (orderId: string) => `/payment/${orderId}`,
    },
    confirmation: {
      getPath: (orderId: string) => `/payment/${orderId}/confirmation`,
    },
    success: {
      getPath: (orderId: string) => `/payment/${orderId}/success`,
    },
    changeMethod: {
      getPath: (orderId: string) => `/payment/${orderId}/change-method`,
    },
  },

  me: {
    myorders: {
      path: "/me/myorders",
    },
    myprofile: {
      path: "/me/profile",
    },
    myclasses: {
      path: "/me/classes",
    },
  },
};
