import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "../entity/Message";
import { User } from "../entity/User";

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  async messages() {
    const allMessages = await Message.find({ relations: ["user", "chatRoom"] });
    console.log(allMessages);
    return allMessages;
  }
  @Mutation(() => Message)
  async createMessage(
    @Arg("userID") userID: string,
    @Arg("content") content: string
  ) {
    const user = await User.findOne({
      where: { id: userID },
      relations: ["messages"],
    });
    console.log(user);
    const message = new Message();
    message.content = content;
    message.user = user;
    message.save();
    return message;
  }
  @Mutation(() => String)
  async deleteMessage(@Arg("id") id: string) {
    let del = await Message.delete({ id });
    console.log(del);
    return "g2g";
  }
}
