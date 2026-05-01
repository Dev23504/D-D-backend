const products = [
  ...Array.from({ length: 15 }, (_, i) => ({
    name: `Men Product ${i + 1}`,
    price: 500 + i * 100,
    image: `/images/m${i + 1}.jpeg`,
    category: "men",
  })),

  ...Array.from({ length: 15 }, (_, i) => ({
    name: `Women Product ${i + 1}`,
    price: 600 + i * 120,
    image: `/images/w${i + 1}.jpeg`,
    category: "women",
  })),

  ...Array.from({ length: 10 }, (_, i) => ({
    name: `Kids Product ${i + 1}`,
    price: 300 + i * 80,
    image: `/images/k${i + 1}.jpeg`,
    category: "kids",
  })),

  ...Array.from({ length: 10 }, (_, i) => ({
    name: `Beauty Product ${i + 1}`,
    price: 200 + i * 50,
    image: `/images/b${i + 1}.jpeg`,
    category: "beauty",
  })),
];

export default products;