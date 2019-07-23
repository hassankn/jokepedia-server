import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";
import {joke} from "./joke";


@Entity("comment",{schema:"jokedb" } )
@Index("fk_comment_user1_idx",["user",])
@Index("fk_comment_joke1_idx",["joke",])
export class comment {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"comment_id"
        })
    comment_id:number;
        

   
    @ManyToOne(type=>user, user=>user.comments,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'user_id'})
    user:user | null;


   
    @ManyToOne(type=>joke, joke=>joke.comments,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'joke_id'})
    joke:joke | null;


    @Column("varchar",{ 
        nullable:true,
        length:250,
        name:"text"
        })
    text:string | null;
        
}
