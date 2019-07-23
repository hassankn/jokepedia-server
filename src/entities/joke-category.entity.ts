import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {joke} from "./joke.entity";
import {category} from "./category.entity";


@Entity("joke_category",{schema:"jokedb" } )
@Index("fk_joke_category_joke1_idx",["joke",])
@Index("fk_joke_category_category1_idx",["category",])
export class JokeCategory {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"joke_category_id"
        })
    jokeCategoryId:number;
        

   
    @ManyToOne(type=>joke, joke=>joke.jokeCategorys,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'joke_id'})
    joke:joke | null;


   
    @ManyToOne(type=>category, category=>category.jokeCategorys,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'category_id'})
    category:category | null;

}
