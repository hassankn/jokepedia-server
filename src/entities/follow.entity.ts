import { Entity, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['follows', 'follower'])
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
