import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Message} from './Message'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(()=> Message, message => message.user, {cascade:true})
    messages: Message[]

}
