import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";


@Entity("follow",{schema:"jokedb" } )
@Index("fk_Follow_User_idx",["userUserId",])
@Index("fk_Follow_User1_idx",["userUserId2",])
export class follow {

   
    @ManyToOne(type=>user, user=>user.follows,{ primary:true, nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'User_User_id1'})
    userUserId:user | null;


   
    @ManyToOne(type=>user, user=>user.follows2,{ primary:true, nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'User_User_id2'})
    userUserId2:user | null;

}
