// src/toursData.js
//Original src: https://www.course-api.com/images/tours/tour-5.jpeg
export const tours = [
    {
      id: "rec6d6T3q5EBIdCfD",
      name: "Best of Paris in 7 Days Tour",
      info: "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas. On this tour, your Paris-savvy Rick Steves guide will immerse you in the very best of the City of Light: the masterpiece-packed Louvre and Orsay museums, resilient Notre-Dame Cathedral, exquisite Sainte-Chapelle, and extravagant Palace of Versailles. You'll also enjoy guided neighborhood walks through the city's historic heart as well as quieter moments to slow down and savor the city's intimate cafés, colorful markets, and joie de vivre. Join us for the Best of Paris in 7 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-1.jpeg",
      price: "1,995",
    },
    {
      id: "recIwxrvU9HfJR3B4",
      name: "Best of Ireland in 14 Days Tour",
      info: "Rick Steves' Best of Ireland tour kicks off with the best of Dublin, followed by Ireland's must-see historical sites, charming towns, music-filled pubs, and seaside getaways — including Kinsale, the Dingle Peninsula, the Cliffs of Moher, the Aran Islands, Galway, Connemara, Giant's Causeway, and the compelling city of Belfast. All along the way, Rick's guides will share their stories to draw you in to the Emerald Isle, and the friendliness of the people will surely steal your heart. Join us for the Best of Ireland in 14 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-2.jpeg",
      price: "3,895",
    },
    {
      id: "recJLWcHScdUtI3ny",
      name: "Best of Salzburg & Vienna in 8 Days Tour",
      info: "Let's go where classical music, towering castles, and the-hills-are-alive scenery welcome you to the gemütlichkeit of Bavaria and opulence of Austria's Golden Age. Your Rick Steves guide will bring this region's rich history and culture to life in festive Munich, Baroque Salzburg, sparkling Lake Hallstatt, monastic Melk, the blue Danube, and royal Vienna — with cozy villages and alpine vistas all along the way. Join us for the Best of Munich, Salzburg & Vienna in 8 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-3.jpeg",
      price: "2,695",
    },
    {
      id: "recK2AOoVhIHPLUwn",
      name: "Best of Rome in 7 Days Tour",
      info: "Our Rome tour serves up Europe's most intoxicating brew of dazzling art, earth-shaking history, and city life with style. On this Rome vacation, your tour guide will resurrect the grandeur of ancient Rome's Colosseum, Forum, Pantheon, and nearby Ostia Antica. From the Renaissance and Baroque eras, you'll marvel at St. Peter's Basilica, the Vatican Museums, Sistine Chapel, and Borghese Gallery. You'll also enjoy today's Rome, with neighborhood walking tours, memorable restaurants, and time to explore on your own. Join us for the Best of Rome in 7 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-4.jpeg",
      price: "2,095",
    },
    {
      id: "receAEzz86KzW2gvH",
      name: "Best of Poland in 10 Days Tour",
      info: "Starting in the colorful port city of Gdańsk, you'll escape the crowds and embrace the understated elegance of ready-for-prime-time Poland for 10 days. With an expert Rick Steves guide at your side, you'll experience mighty Malbork castle, the cobbly-cute village of Toruń, Poland's contemporary capital of Warsaw, the spiritual Jasna Góra Monastery, and charming Kraków — Poland's finest city. In this land of surprises — so trendy and hip, yet steeped in history — there's so much to discover. Join us for the Best of Poland in 10 Days!",
      image: "https://tx00-web-en.github.io/resources/img/tours/tour-5.jpeg",
      price: "2,595",
    },
  ];

/*
toursData.js → 提供数据（数组）

顶层组件App.jsx → 拿到数组，把它传给 TourList
从 toursData.js 导入旅游数据 tours
渲染 <TourList />，并把 tours 传进去
关键参数：
tours={tours} → 把数据流向子组件

父组件TourList.jsx → 遍历数组→ 给每个元素生成子组件 → 通过 props 传递完整对象
接收参数：props.tours → 一个旅游对象数组

子组件Tour.jsx → 接收 props → 拆解对象 → 渲染内容
接收参数：props.tour → 一个完整的旅游对象
*/