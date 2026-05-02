const baseURL = "http://localhost:5173";

const products = [
  ...Array.from({ length: 15 }).map((_, i) => ({
    name: `Men Product ${i + 1}`,
    price: 500 + i * 100,
    image: `${baseURL}/images/m${i + 1}.jpeg`,
    category: "men"
  })),

  ...Array.from({ length: 15 }).map((_, i) => ({
    name: `Women Product ${i + 1}`,
    price: 600 + i * 120,
    image: `${baseURL}/images/w${i + 1}.jpeg`,
    category: "women"
  })),

  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Kids Product ${i + 1}`,
    price: 300 + i * 80,
    image: `${baseURL}/images/k${i + 1}.jpeg`,
    category: "kids"
  })),

  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Beauty Product ${i + 1}`,
    price: 200 + i * 50,
    image: `${baseURL}/images/b${i + 1}.jpeg`,
    category: "beauty"
  }))
];

export default products;