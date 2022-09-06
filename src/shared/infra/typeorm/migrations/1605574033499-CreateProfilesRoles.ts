import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProfileRoles1605574033499
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles_roles',
        columns: [
          {
            name: 'profile_id',
            type: 'uuid',
          },
          {
            name: 'role_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('profiles_roles', [
      new TableForeignKey({
        name: 'profiles_roles_profile',
        columnNames: ['profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profiles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'profiles_roles_role',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      'profiles_roles',
      'profiles_roles_profile',
    );
    await queryRunner.dropForeignKey('profiles_roles', 'profiles_roles_role');

    await queryRunner.dropTable('profiles_roles');
  }
}
