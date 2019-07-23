import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";
import {comment} from "./comment";
import {joke_category} from "./joke_category";
import {rate} from "./rate";
import {report} from "./report";


@Entity("joke",{schema:"jokedb" } )
@Index("fk_joke_User1_idx",["user",])
export class joke {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"joke_id"
        })
    joke_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:10000,
        name:"text"
        })
    text:string | null;
        

   
    @ManyToOne(type=>user, user=>user.jokes,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'user_id'})
    user:user | null;


   
    @OneToMany(type=>comment, comment=>comment.joke,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    comments:comment[];
    

   
    @OneToMany(type=>joke_category, joke_category=>joke_category.joke,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    jokeCategorys:joke_category[];
    

   
    @OneToMany(type=>rate, rate=>rate.joke,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    rates:rate[];
    

   
    @OneToMany(type=>report, report=>report.jokeJoke,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    reports:report[];
    
}
