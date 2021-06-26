import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    const allUsers = await User.find({relations:["messages", "chatrooms"]});
    return allUsers;
  }
  @Query(()=> User)
  async user(@Arg("userID") userID: string){
    const user = await User.findOne({where: { id: userID }, relations:["messages", "chatrooms"]})
    return user
  }
  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    let user = new User();
    user.name = name;
    user = await User.save(user);
    return user;
  }
}
