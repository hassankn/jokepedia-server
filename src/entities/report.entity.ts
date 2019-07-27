import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Joke } from './joke.entity';

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    reportId: number;

    @ManyToOne(() => User, user => user.reports,
        {
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Joke, joke => joke.reports,
        {
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    joke: Joke;

    @Column('varchar', {
        nullable: false,
    })
    description: string;

}
