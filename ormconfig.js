require("dotenv").config();

let config = {
  synchronize: true,
  entities: [ "dist/**/*.entity.js"],
  "migrationsTableName": "migrations",
  "migrations": ["migration/*.ts"],
  // logging: true,
  "cli": {
    "migrationsDir": "migration"
  }
}

if (true) {
  config = {
    ...config,
    // extra: {
    //   ssl: true,
    // },
    url: process.env.DATABASE_URL,
    type: "postgres",
    database: "./database.sqlite",
  }
}

module.exports = config

// module.exports = {
//   name: "default",
//   type: "postgres",
//   host: process.env.DATABASE_HOST,
//   port: 5432,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   synchronize: true,
//   dropSchema: false,
//   logging: true,
//   entities: ["src/**/*.entity.ts", "dist/**/*.entity.js"],
// };
