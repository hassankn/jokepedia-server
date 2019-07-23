import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user.entity";


@Entity("level",{schema:"jokedb" } )
export class Level {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"level_id"
        })
    levelId:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:150,
        name:"name"
        })
    name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:250,
        name:"description"
        })
    description:string | null;
        

   
    @OneToMany(type=>user, user=>user.level,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    users:user[];
    
}
