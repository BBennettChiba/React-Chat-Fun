import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";
import { ChatRoom } from "./Chatroom";

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @Field(() => ChatRoom, { nullable: true })
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.messages)
  chatRoom: ChatRoom;

  @Field(() => String, { nullable: true })
  @Column()
  content: String;
}
