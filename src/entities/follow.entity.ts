import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow {

    @ManyToOne(() => User, user => user.follows,
        {
            primary: true,
            nullable: false,
        })
    @JoinColumn()
    follows: User;

    @ManyToOne(() => User, user => user.follower,
        {
            primary: true,
            nullable: false,
        })
    @JoinColumn()
    follower: User;
}
