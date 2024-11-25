const { Sequelize } = require("sequelize");

//sequelize instance
const sequelize = new Sequelize({
  host: "db",
  dialect: "postgres",
  username: "postgres",
  password: "hana",
  database: "database_development",
  retry: {
    max: 5,
    match: [Sequelize.ConnectionError],
    backoffBase: 1000,
    backoffExponent: 1.5,
  },
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

module.exports = dbConnection;
