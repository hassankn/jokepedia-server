import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Joke } from './joke.entity';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column('varchar', {
        nullable: false,
        length: 150,
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 250,
    })
    description: string;

    @ManyToMany(() => Joke, joke => joke.categories,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    jokes: Joke[];
}
