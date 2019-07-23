import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Level {

    @PrimaryGeneratedColumn()
    levelId: number;

    @Column('varchar', {
        nullable: false,
        length: 150,
        name: 'name',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'description',
    })
    description: string;

    @OneToMany(() => User, user => user.level,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    users: User[];

}
