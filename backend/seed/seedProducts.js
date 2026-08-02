<<<<<<< HEAD
// Seeds the three flavors already featured on the site as real, orderable
// products. Safe to re-run — it upserts by name instead of duplicating.
=======
// Seeds 8 juice flavors as real, orderable products. Safe to re-run —
// it upserts by name instead of duplicating.
>>>>>>> 5d04e2d (Initial commit)
// Run with: npm run seed:products
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

const STARTER_PRODUCTS = [
  {
    name: "Watermelon Cold Press",
    flavor: "Watermelon",
    description: "Slow-extracted watermelon juice, packed with natural hydration and vitamin C.",
    price: 5.99,
    image:
      "https://images.pexels.com/photos/11009208/pexels-photo-11009208.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Orange Cold Press",
    flavor: "Orange",
    description: "Bright, fresh-squeezed orange juice with a full daily dose of vitamin C.",
    price: 5.99,
    image:
      "https://images.pexels.com/photos/5946790/pexels-photo-5946790.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Mango Cold Press",
    flavor: "Mango",
    description: "Rich, tropical mango juice, cold pressed to lock in flavor and nutrients.",
    price: 6.49,
    image:
      "https://images.pexels.com/photos/4955257/pexels-photo-4955257.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
<<<<<<< HEAD
=======
  {
    name: "Pineapple Cold Press",
    flavor: "Pineapple",
    description: "Bright, tangy pineapple juice with a bold tropical bite.",
    price: 5.79,
    image:
      "https://images.pexels.com/photos/5146439/pexels-photo-5146439.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Green Apple Cold Press",
    flavor: "Green Apple",
    description: "Crisp, lightly tart green apple juice pressed straight from the orchard.",
    price: 5.59,
    image:
      "https://images.pexels.com/photos/5876752/pexels-photo-5876752.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Pomegranate Cold Press",
    flavor: "Pomegranate",
    description: "Rich in antioxidants, with a deep, jewel-toned flavor.",
    price: 6.99,
    image:
      "https://images.pexels.com/photos/15545361/pexels-photo-15545361.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Mixed Berry Cold Press",
    flavor: "Mixed Berry",
    description: "Blueberry, raspberry and blackberry, blended and cold pressed together.",
    price: 6.29,
    image:
      "https://images.pexels.com/photos/11135665/pexels-photo-11135665.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Carrot Ginger Cold Press",
    flavor: "Carrot Ginger",
    description: "Earthy carrot juice with a spiced ginger kick for an extra boost.",
    price: 5.89,
    image:
      "https://images.pexels.com/photos/4443459/pexels-photo-4443459.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Apple Cold Press",
    flavor: "Apple",
    description: "Classic sweet apple juice, pressed fresh with no added sugar.",
    price: 5.49,
    image:
      "https://images.pexels.com/photos/8228301/pexels-photo-8228301.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Grapefruit Cold Press",
    flavor: "Grapefruit",
    description: "Tart, refreshing grapefruit juice with a citrusy punch.",
    price: 6.19,
    image:
      "https://images.pexels.com/photos/11832019/pexels-photo-11832019.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Beetroot Cold Press",
    flavor: "Beetroot",
    description: "Earthy beetroot juice, cold pressed for a deep, nutrient-rich boost.",
    price: 6.39,
    image:
      "https://images.pexels.com/photos/34692627/pexels-photo-34692627.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Cucumber Mint Cold Press",
    flavor: "Cucumber Mint",
    description: "Light, cooling cucumber juice with a hint of fresh mint.",
    price: 5.69,
    image:
      "https://images.pexels.com/photos/5817525/pexels-photo-5817525.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Peach Cold Press",
    flavor: "Peach",
    description: "Juicy, fragrant peach juice pressed at peak ripeness.",
    price: 6.09,
    image:
      "https://images.pexels.com/photos/17525264/pexels-photo-17525264.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Lemon Ginger Cold Press",
    flavor: "Lemon Ginger",
    description: "Zesty lemon juice with a warming ginger kick, great for immunity.",
    price: 5.99,
    image:
      "https://images.pexels.com/photos/4134388/pexels-photo-4134388.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Kiwi Cold Press",
    flavor: "Kiwi",
    description: "Bright, tangy-sweet kiwi juice packed with vitamin C.",
    price: 6.29,
    image:
      "https://images.pexels.com/photos/37124031/pexels-photo-37124031.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
  {
    name: "Coconut Water Cold Press",
    flavor: "Coconut Water",
    description: "Naturally hydrating coconut water, light and subtly sweet.",
    price: 5.89,
    image:
      "https://images.pexels.com/photos/33044067/pexels-photo-33044067.jpeg?auto=compress&cs=tinysrgb&w=600",
    stock: 100,
    isActive: true,
  },
>>>>>>> 5d04e2d (Initial commit)
];

async function run() {
  await connectDB();

  for (const product of STARTER_PRODUCTS) {
    await Product.findOneAndUpdate({ name: product.name }, product, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    console.log(`Upserted product: ${product.name}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
