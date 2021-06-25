import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ChatRoom } from "../entity/Chatroom";
import { Message } from "../entity/Message";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    const allUsers = await User.find({relations:["messages", "chatrooms"]});
    console.log(allUsers[0])
    return allUsers;
  }
  @Query(() => [ChatRoom])
  async chatRooms() {
    const allChatrooms = await ChatRoom.find({
      relations: ["users", "messages"],
    });
    return allChatrooms;
  }
  @Query(() => [Message])
  async messages() {
    const allMessages = await Message.find({relations:["user", "chatRoom"]});
    return allMessages;
  }
  @Mutation(() => Message)
  async createMessage(@Arg("userID") userID: string, @Arg("content") content: string) {
    const user = await User.findOne({ where: { id:userID }, relations: ["messages"] });
    console.log(user)
    const message = new Message();
    message.content = content;
    message.user = user
    message.save()
    return message
  }
  @Mutation(() => String)
  async deleteMessage(@Arg('id') id: string){
    let del = await Message.delete({id})
    console.log(del)
    return "g2g"
  }
  @Mutation(() => ChatRoom)
  async createChatRoom(@Arg("userID") userID: string) {
    let chatRoom = new ChatRoom();
    const user = await User.findOne({
      where: { id: userID },
      relations: ["chatrooms"],
    });
    console.log(user)
    chatRoom.users = [ user];
    chatRoom = await chatRoom.save();
    return chatRoom;
  }
  @Mutation(() => ChatRoom)
  async addUserToChatRoom(
    @Arg("userID") userID: string,
    @Arg("chatRoomId") chatRoomId: string
  ) {
    try {
      let chatRoom = await ChatRoom.findOne({
        where: { id: chatRoomId },
        relations: ["messages", "users"],
      });
      let user = await User.findOne({ where: { id: userID } });
      chatRoom.users = [...chatRoom.users, user];
      chatRoom = await chatRoom.save();
      return chatRoom;
    } catch (err) {
      console.log(err);
    }
    // chatRoom.users = [...chatRoom.users]
  }
  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    let user = new User();
    user.name = name;
    user = await User.save(user);
    return user;
  }
  @Mutation(() => ChatRoom)
  async dropUserFromChatroom(
    @Arg("userID") userID: string,
    @Arg("chatRoomId") chatRoomId: string
  ) {
    let chatRoom = await ChatRoom.findOne({
      where: { id: chatRoomId },
      relations: ["users"],
    });
    chatRoom.users = chatRoom.users.filter((user) => user.id !== userID);
    chatRoom = await chatRoom.save();
    return chatRoom;
  }
}
