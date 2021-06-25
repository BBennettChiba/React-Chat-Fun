import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
  JoinTable,
  ManyToMany
} from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class ChatRoom extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.chatrooms)
  users: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[];
}
