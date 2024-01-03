const tagModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Tag",
    {
      tagName: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = {
  tagModel,
};
