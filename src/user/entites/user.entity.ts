
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from 'src/user/entites/role.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text', { unique: true })
    username: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('bool', { default: true })
    active: boolean;

    @OneToMany(
        () => Rol,
        rol => rol.user,
        { cascade: true, eager: true }
    )
    roles: Rol[];
}


