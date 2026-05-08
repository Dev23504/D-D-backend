const products = [

  ...Array.from({ length: 15 }).map((_, i) => ({
    name: `Men Product ${i + 1}`,
    price: 500 + i * 100,
    image: `/images/m${i + 1}.jpeg`,
    category: "men",
    discount: Math.floor(Math.random() * 40) + 10
  })),

  ...Array.from({ length: 15 }).map((_, i) => ({
    name: `Women Product ${i + 1}`,
    price: 700 + i * 120,
    image: `/images/w${i + 1}.jpeg`,
    category: "women",
    discount: Math.floor(Math.random() * 40) + 10
  })),

  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Kids Product ${i + 1}`,
    price: 300 + i * 80,
    image: `/images/k${i + 1}.jpeg`,
    category: "kids",
    discount: Math.floor(Math.random() * 40) + 10
  })),

  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Beauty Product ${i + 1}`,
    price: 400 + i * 90,
    image: `/images/b${i + 1}.jpeg`,
    category: "beauty",
    discount: Math.floor(Math.random() * 40) + 10
  }))

];

export default products;