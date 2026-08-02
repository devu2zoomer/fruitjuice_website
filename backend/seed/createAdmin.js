// Creates (or promotes) the admin account defined in .env.
// Run with: npm run seed:admin
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

async function run() {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.");
    process.exit(1);
  }

  await connectDB();

  const email = ADMIN_EMAIL.toLowerCase().trim();
  let admin = await User.findOne({ email });

  if (admin) {
    admin.role = "admin";
    admin.name = ADMIN_NAME || admin.name;
    await admin.save();
    console.log(`Existing user "${email}" promoted to admin.`);
  } else {
    admin = await User.create({
      name: ADMIN_NAME || "Admin",
      email,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(`Admin account created: ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seeding failed:", err.message);
  process.exit(1);
});
