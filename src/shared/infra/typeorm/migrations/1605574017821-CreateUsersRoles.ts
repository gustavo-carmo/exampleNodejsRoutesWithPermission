import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateUserRoles1605574017821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'users_roles',
          columns: [
            {
              name: 'user_id',
              type: 'uuid'
            },
            {
              name: 'role_id',
              type: 'uuid'
            }
          ]
        })
      );

      await queryRunner.createForeignKeys(
        'users_roles',
        [
          new TableForeignKey({
            name: 'users_roles_user',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }),
          new TableForeignKey({
            name: 'users_roles_role',
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }),
        ]
      );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('users_roles', 'users_roles_user');
      await queryRunner.dropForeignKey('users_roles', 'users_roles_role');

      await queryRunner.dropTable('users_roles');
    }

}
