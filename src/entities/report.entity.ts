import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {User} from "./user.entity";
import {Joke} from "./joke.entity";


@Entity()
export class Report {

    
    @PrimaryGeneratedColumn()
    reportId:number;
        

   
    @ManyToOne(type=>User, user=>user.reports,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'user_user_id'})
    userUser:User | null;


   
    @ManyToOne(type=>Joke, joke=>joke.reports,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'joke_joke_id'})
    jokeJoke:Joke | null;

}
