import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow {

    @ManyToOne(() => User, user => user.follows,
        {
            primary: true,
            nullable: false,
        })
    follows: User;

    @ManyToOne(() => User, user => user.follower,
        {
            primary: true,
            nullable: false,
        })
    follower: User;
}
