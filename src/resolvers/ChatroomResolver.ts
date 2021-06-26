import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ChatRoom } from "../entity/Chatroom";
import { User } from "../entity/User";

@Resolver()
export class ChatRoomResolver {
  @Query(() => [ChatRoom])
  async chatRooms() {
    const allChatrooms = await ChatRoom.find({
      relations: ["users", "messages"],
    });
    return allChatrooms;
  }
  @Mutation(() => ChatRoom)
  async createChatRoom(@Arg("userID") userID: string) {
    let chatRoom = new ChatRoom();
    const user = await User.findOne({
      where: { id: userID },
      relations: ["chatrooms"],
    });
    console.log(user);
    chatRoom.users = [user];
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
