
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from '../../common/constants';
import { User } from "./user.entity";

@Entity()
export class Rol {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: Roles;

    @Column('int', { default: 0 })
    permission: number;

    @ManyToOne(
        () => User,
        user => user.roles)
    user: User;

}