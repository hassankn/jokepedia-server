import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Level {

    @PrimaryGeneratedColumn()
    levelId: number;

    @Column('varchar', {
        nullable: true,
        length: 150,
        name: 'name',
    })
    name: string | null;

    @Column('varchar', {
        nullable: true,
        length: 250,
        name: 'description',
    })
    description: string | null;

    @OneToMany(() => User, user => user.level,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    users: User[];

}
