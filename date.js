const productsData = [
    {
      id: 1,
      name: "Musculosa Beige",
      price: 6000,
      category: "musculosa", 
      cardImg: "media/musculosa1.jpg",
      
    },
    {
      id: 2,
      name: "Musculosa Negra",
      price: 6000,
      category: "musculosa",
      cardImg: "media/musculosa2.webp",
    },
    {
      id: 3,
      name: "Musculosa God's Gym",
      price: 6000,
      category: "musculosa",
      cardImg: "media/musculosa3.webp",
    },
    {
        id: 4,
        name: "Musculosa Yohiro Ngra",
        price: 6000,
        category: "musculosa",
        cardImg: "media/musculosa4.webp",
      
    },
    {
      id: 5,
        name: "Oversized Rampagne",
        price: 9000,
        category: "oversized",
        cardImg: "media/over1.webp",
    },
    {
      id: 6,
        name: "Oversized Blanca",
        price: 9000,
        category: "oversized",
        cardImg: "media/over2.jpg",
    },
    {
      id: 7,
      name: "Oversized Negra",
      price: 9000,
      category: "oversized",
      cardImg: "media/over3.webp",
    },
    {
      id: 8,
        name: "Slim fit Beige",
        price: 7000,
        category: "slim-fit",
        cardImg: "media/slim1.jpg",
    },
    {
      id: 9,
        name: "Slim fit Negra",
        price: 7000,
        category: "slim-fit",
        cardImg: "media/slim2.jpg",
    },
    {
      id: 10,
      name: "Slim fir Negra GOLD's",
      price: 7000,
      category: "slim-fit",
      cardImg: "media/slim3.jpg",
    },
    {
      id: 11,
      name: "Musculosa Beige",
      price: 6000,
      category: "musculosa", 
      cardImg: "media/musculosa1.jpg",
    },
    {
      id: 12,
      name: "Musculosa Negra",
      price: 6000,
      category: "musculosa",
      cardImg: "media/musculosa2.webp",
    },
    {
      id: 13,
      name: "Musculosa God's Gym",
      price: 6000,
      category: "musculosa",
      cardImg: "media/musculosa3.webp",
    },
    {
      id: 14,
        name: "Musculosa Yohiro Ngra",
        price: 6000,
        category: "musculosa",
        cardImg: "media/musculosa4.webp",
    },
    {
      id: 15,
        name: "Oversized Rampagne",
        price: 9000,
        category: "oversized",
        cardImg: "media/over1.webp",
    },
  ];
  
  // Funcion para dividir el array en X cantidad de arrays
  const DivideProductsInParts = (size) => {
    let productList = [];
  
    for (let i = 0; i < productsData.length; i += size) {
      productList.push(productsData.slice(i, i + size));
    }
    return productList;
  };
  
  // Appstate
  const appState = {
    products: DivideProductsInParts(6),
    currentProductsIndex: 0,
    productsLimit: DivideProductsInParts(6).length,
    activeFilter: null,
  };


