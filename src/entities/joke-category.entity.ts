import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Joke } from './joke.entity';
import { Category } from './category.entity';

@Entity()
export class JokeCategory {

    @PrimaryGeneratedColumn()
    jokeCategoryId: number;

    @ManyToOne(() => Joke, joke => joke.jokeCategorys,
        {
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    joke: Joke;

    @ManyToOne(() => Category, category => category.jokeCategories,
        {
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    category: Category;

}
