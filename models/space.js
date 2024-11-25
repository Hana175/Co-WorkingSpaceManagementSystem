"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Space extends Model {
    static associate(models) {
      Space.hasMany(models.Booking, {
        foreignKey: "spaceId", // foreign key name in boookings table
        as: "bookings", // alias
      });
    }
  }

  Space.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      type: DataTypes.ENUM("private office", "meeting room", "hot desk"),
      capacity: DataTypes.INTEGER,
      pricePerHour: DataTypes.DECIMAL,
      availability: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Space",
      tableName: "Spaces",
    }
  );
  return Space;
};
