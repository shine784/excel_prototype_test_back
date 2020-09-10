module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cell', {
        abx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        aby: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        stringdata: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        doubledata: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        formula: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        style: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        x: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        y: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tilex: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tiley: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
}
