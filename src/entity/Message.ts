import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";
 
@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User, user => user.messages)
    user: User

    @Column()
    content: String
}