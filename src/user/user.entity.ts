import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BaseEntity} from 'typeorm';
import {Notice} from "../notice/notice.entity";
import {CreateUserDto} from "./dto/create-user-dto";
import {Exclude} from "class-transformer";

import * as bcrypt from 'bcrypt';


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username:string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Notice, notice=> notice.user)
    notices: Notice[];

    @Column({default: ""})
    refreshToken: string;

    constructor(userData:CreateUserDto) {
        Object.assign(this,userData);
    }

    @BeforeInsert()
    async hashPassword(){
        const saltOrRounds:number = 10;
        this.password = await bcrypt.hash(this.password,saltOrRounds);
    }
}
