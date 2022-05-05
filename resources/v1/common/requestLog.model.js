'use strict';
const Sequelize = require('sequelize');

module.exports = class RequestLogModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                host: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                method: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                },
                api_token: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                user_agent: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                base_url: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                full_url: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                route: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                ip: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                body: {
                    type: DataTypes.JSON,
                    allowNull: true,
                }
            },
            {
                modelName: 'RequestLog',
                tableName: 'request_logs',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }
}