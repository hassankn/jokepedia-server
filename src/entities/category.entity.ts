import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JokeCategory } from './joke-category.entity';

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

    @OneToMany(() => JokeCategory, jokeCategory => jokeCategory.category,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    jokeCategories: JokeCategory[];
}
