import "reflect-metadata";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {Message} from '../entity/Message'

export async function createMessage(userID, content){
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({where: {id: userID}, relations:['messages']})
     const message = new Message();
    message.content = content;
    user.messages = [...user.messages, message];
    const save = userRepo.save(user);
    return save.
}