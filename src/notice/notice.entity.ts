import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {User} from "../user/user.entity";

@Entity()
export class Notice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    Content: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(type => User, user => user.notices,
        {
            nullable:false,
            onDelete:'CASCADE'
        })
    user: User;
}
