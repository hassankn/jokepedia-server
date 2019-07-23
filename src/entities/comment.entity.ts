import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Joke } from './joke.entity';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    commentId: number;

    @ManyToOne(() => User, user => user.comments, {
        nullable: false,
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Joke, joke => joke.comments,
        {
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn({ name: 'joke_id' })
    joke: Joke | null;

    @Column('varchar', {
        nullable: false,
        length: 250,
        name: 'text',
    })
    text: string;

}
