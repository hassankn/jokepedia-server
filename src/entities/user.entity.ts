import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Level } from './level.entity';
import { Comment } from './comment.entity';
import { Follow } from './follow.entity';
import { Joke } from './joke.entity';
import { Rate } from './rate.entity';
import { Report } from './report.entity';


@Entity('user', { schema: 'jokedb' })
@Index('username_UNIQUE', ['username'], { unique: true })
@Index('fk_User_Ranking2_idx', ['level'])
export class User {

    @Column('int', {
        nullable: false,
        primary: true,
        name: 'user_id',
    })
    userId: number;

    @Column('varchar', {
        nullable: true,
        unique: true,
        length: 50,
        name: 'username'
    })
    username: string | null;


    @Column('varchar', {
        nullable: true,
        length: 250,
        name: 'Name'
    })
    Name: string | null;


    @Column('varchar', {
        nullable: true,
        length: 250,
        name: 'Email'
    })
    Email: string | null;


    @Column('varchar', {
        nullable: true,
        length: 150,
        name: 'password'
    })
    password: string | null;



    @ManyToOne(() => level, level => level.users, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'level_id' })
    level: level | null;



    @OneToMany(() => comment, comment => comment.user, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    comments: comment[];



    @OneToMany(() => follow, follow => follow.userUserId, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    follows: follow[];



    @OneToMany(() => follow, follow => follow.userUserId2, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    follows2: follow[];



    @OneToMany(() => joke, joke => joke.user, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    jokes: joke[];



    @OneToMany(() => rate, rate => rate.user, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    rates: rate[];



    @OneToMany(() => report, report => report.userUser, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    reports: report[];

}
