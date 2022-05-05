'use strict';
const Sequelize = require('sequelize');

module.exports = class ApiTokenModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                token: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                type: {
                    type: DataTypes.ENUM('unoapp', 'partner', 'client', 'other'),
                    defaultValue: 'client',
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
            },
            {
                modelName: 'ApiToken',
                tableName: 'api_tokens',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {
        this.relationship = this.belongsTo(models.Application, {
            as: 'application',
            foreignKey: 'application_id',
            onDelete: 'SET NULL',
        })
    }
}