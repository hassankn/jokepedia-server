import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JokeCategory } from './joke-category.entity';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    categoryId: number;

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

    @OneToMany(() => JokeCategory, jokeCategory => jokeCategory.category, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    jokeCategories: JokeCategory[];
}
