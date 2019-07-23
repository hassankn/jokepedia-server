import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follow {

    @ManyToOne(() => User, user => user.follows,
        {
            primary: true,
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn()
    userUserId: User | null;

    @ManyToOne(() => User, user => user.follows2,
        {
            primary: true,
            nullable: false,
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        })
    @JoinColumn({ name: 'User_User_id2' })
    userUserId2: User | null;
}
