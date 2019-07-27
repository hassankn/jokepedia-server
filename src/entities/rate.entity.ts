import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Joke } from './joke.entity';
import { User } from './user.entity';

@Entity()
@Unique(['user', 'joke'])
export class Rate {

    @PrimaryGeneratedColumn()
    rateId: number;

    @ManyToOne(() => Joke, joke => joke.rates,
        {
            primary: true,
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    joke: Joke;

    @ManyToOne(() => User, user => user.rates,
        {
            primary: true,
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    user: User;

    @Column('int', {
        nullable: false,
    })
    rating: number;

}
