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
