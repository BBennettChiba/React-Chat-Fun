import { Field, ObjectType, ID } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  BaseEntity,
  Column,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { ChatRoom } from "./Chatroom";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [ChatRoom], { nullable: true })
  @ManyToMany(() => ChatRoom, (chatroom) => chatroom.users, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  chatrooms: ChatRoom[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  messages: Message[];
}
