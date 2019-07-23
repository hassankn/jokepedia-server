import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {level} from "./level";
import {comment} from "./comment";
import {follow} from "./follow";
import {joke} from "./joke";
import {rate} from "./rate";
import {report} from "./report";


@Entity("user",{schema:"jokedb" } )
@Index("username_UNIQUE",["username",],{unique:true})
@Index("fk_User_Ranking2_idx",["level",])
export class user {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"user_id"
        })
    user_id:number;
        

    @Column("varchar",{ 
        nullable:true,
        unique: true,
        length:50,
        name:"username"
        })
    username:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:250,
        name:"Name"
        })
    Name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:250,
        name:"Email"
        })
    Email:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:150,
        name:"password"
        })
    password:string | null;
        

   
    @ManyToOne(type=>level, level=>level.users,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'level_id'})
    level:level | null;


   
    @OneToMany(type=>comment, comment=>comment.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    comments:comment[];
    

   
    @OneToMany(type=>follow, follow=>follow.userUserId,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    follows:follow[];
    

   
    @OneToMany(type=>follow, follow=>follow.userUserId2,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    follows2:follow[];
    

   
    @OneToMany(type=>joke, joke=>joke.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    jokes:joke[];
    

   
    @OneToMany(type=>rate, rate=>rate.user,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    rates:rate[];
    

   
    @OneToMany(type=>report, report=>report.userUser,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    reports:report[];
    
}
