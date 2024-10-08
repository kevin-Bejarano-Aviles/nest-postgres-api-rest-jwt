import { User } from "../../users/entities/user.entity";
import { Breed } from "../../breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne( ()=> Breed, (breed)=> breed.id ,{
        eager:true //para que traiga la raza cuando hagamos un find one 
    })
    breed: Breed;
    
    @ManyToOne(() => User)
    @JoinColumn({name:'userEmail', referencedColumnName: 'email'})
    user:User;

    @Column()
    userEmail: string
}
