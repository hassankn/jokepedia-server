import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {joke_category} from "./joke_category";


@Entity("category",{schema:"jokedb" } )
export class category {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"category_id"
        })
    category_id:number;
        

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
        

   
    @OneToMany(type=>joke_category, joke_category=>joke_category.category,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    jokeCategorys:joke_category[];
    
}
