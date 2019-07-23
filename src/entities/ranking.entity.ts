import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("ranking",{schema:"jokedb" } )
export class Ranking {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"Ranking_id"
        })
    rankingId:number;
        

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
        
}
