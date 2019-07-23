import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user.entity";
import {joke} from "./joke.entity";


@Entity("report",{schema:"jokedb" } )
@Index("fk_report_user1_idx",["userUser",])
@Index("fk_report_joke1_idx",["jokeJoke",])
export class Report {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"report_id"
        })
    reportId:number;
        

   
    @ManyToOne(type=>user, user=>user.reports,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'user_user_id'})
    userUser:user | null;


   
    @ManyToOne(type=>joke, joke=>joke.reports,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'joke_joke_id'})
    jokeJoke:joke | null;

}
