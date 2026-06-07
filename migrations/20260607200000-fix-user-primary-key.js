'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('PRAGMA foreign_keys = OFF;');

        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS "Users_temp" (
                "nickName" VARCHAR(255) NOT NULL PRIMARY KEY,
                "email" VARCHAR(255) NOT NULL UNIQUE,
                "name" VARCHAR(255) NOT NULL,
                "surname" VARCHAR(255),
                "followers" INTEGER NOT NULL DEFAULT 0,
                "createdAt" DATETIME NOT NULL,
                "updatedAt" DATETIME NOT NULL
            );
        `);

        await queryInterface.sequelize.query(`
            INSERT INTO "Users_temp" ("nickName", "email", "name", "surname", "followers", "createdAt", "updatedAt")
            SELECT "nickName", "email", "name", "surname", "followers", "createdAt", "updatedAt" FROM "Users";
        `);

        await queryInterface.dropTable('Users');
        await queryInterface.renameTable('Users_temp', 'Users');

        await queryInterface.sequelize.query('PRAGMA foreign_keys = ON;');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query('PRAGMA foreign_keys = OFF;');

        await queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS "Users_old" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "nickName" VARCHAR(255),
                "email" VARCHAR(255),
                "name" VARCHAR(255),
                "surname" VARCHAR(255),
                "followers" INTEGER,
                "createdAt" DATETIME NOT NULL,
                "updatedAt" DATETIME NOT NULL
            );
        `);

        await queryInterface.sequelize.query(`
            INSERT INTO "Users_old" ("id", "nickName", "email", "name", "surname", "followers", "createdAt", "updatedAt")
            SELECT NULL, "nickName", "email", "name", "surname", "followers", "createdAt", "updatedAt" FROM "Users";
        `);

        await queryInterface.dropTable('Users');
        await queryInterface.renameTable('Users_old', 'Users');

        await queryInterface.sequelize.query('PRAGMA foreign_keys = ON;');
    },
};
