"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Space, {
        foreignKey: "spaceId", //foreign key in Bookings table
        as: "space", //alias
      });
    }
  }

  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      userName: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      spaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Spaces",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", 
      },
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      status: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "Bookings",
    }
  );

  return Booking;
};
