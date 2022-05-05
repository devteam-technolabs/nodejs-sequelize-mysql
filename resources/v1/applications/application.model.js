'use strict';
const Sequelize = require('sequelize');

module.exports = class ApplicationModel extends Sequelize.Model {
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
                active: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
            },
            {
                modelName: 'Application',
                tableName: 'applications',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {
        this.relationship = this.hasMany(models.ApiToken, {
            as: 'api_tokens',
            foreignKey: 'application_id',
            onDelete: 'SET NULL',
        })
    }
}