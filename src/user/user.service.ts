import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Connection, DeleteResult, Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user-dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ) {
    }

    getAll(): Promise<User[]> {
        return this.userRepository.find();
        //return User.find();
    }

    getOne(id: number): Promise<User> {
        return this.userRepository.findOne({id});
    }

    create(userData: CreateUserDto): Promise<User> {
        const user: User = new User(userData);

        //return User.save(user);
        return this.userRepository.save(user);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.userRepository.delete({id,})
        //return User.delete({id,});
    }
}
