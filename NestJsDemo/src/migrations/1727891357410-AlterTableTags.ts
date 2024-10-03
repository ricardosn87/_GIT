import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableTags1727891357410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('tags', [
            new TableColumn({
              name: 'created_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            }),
            new TableColumn({
              name: 'updated_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
            }),
          ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
