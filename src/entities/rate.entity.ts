import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, Unique} from "typeorm";
import {Joke} from "./joke.entity";
import {User} from "./user.entity";


@Entity()
@Unique(['user', 'joke'])
export class Rate {

    @PrimaryGeneratedColumn()
    rateId:number;

    @ManyToOne(type=>Joke, joke=>joke.rates,{ primary:true, nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'joke_id'})
    joke:Joke | null;


   
    @ManyToOne(type=>User, user=>user.rates,{ primary:true, nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'user_id'})
    user:User | null;


    @Column("int",{ 
        nullable:false,
        name:"rating"
        })
    rating:number;
        
}
