import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {joke} from "./joke.entity";
import {user} from "./user.entity";


@Entity("rate",{schema:"jokedb" } )
@Index("fk_rate_joke1_idx",["joke",])
@Index("fk_rate_user1_idx",["user",])
export class Rate {

   
    @ManyToOne(type=>joke, joke=>joke.rates,{ primary:true, nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'joke_id'})
    joke:joke | null;


   
    @ManyToOne(type=>user, user=>user.rates,{ primary:true, nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'user_id'})
    user:user | null;


    @Column("int",{ 
        nullable:false,
        name:"rating"
        })
    rating:number;
        
}
