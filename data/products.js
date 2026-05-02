const products = [
  ...Array.from({ length: 15 }).map((_, i) => ({
    name: `Men Product ${i + 1}`,
    price: 500 + i * 100,
    image: `/images/${i + 1}.jpeg`,
    category: "men"
  })),

  ...Array.from({ length: 15 }).map((_, i) => ({
    name: `Women Product ${i + 1}`,
    price: 600 + i * 120,
    image: `/images/w${i + 1}.webp`,
    category: "women"
  })),

  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Kids Product ${i + 1}`,
    price: 300 + i * 80,
    image: `/images/k${i + 1}.jpg`,
    category: "kids"
  }))
];

export default products;