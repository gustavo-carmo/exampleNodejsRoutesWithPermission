import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateUsers1605574001393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar'
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'profile_id',
              type: 'uuid',
              isNullable: true
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            }
          ]
        })
      );

      await queryRunner.createForeignKey(
        'users',
        new TableForeignKey({
          name: 'user_profile',
          columnNames: ['profile_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'profiles',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('users', 'user_profile');

      await queryRunner.dropTable('users');
    }

}
