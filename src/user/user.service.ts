
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { User } from './entites/user.entity';
import { Rol } from './entites/role.entity';
import { UserDTO } from './dto/user.dto';
import { userSeed, rolSeed } from './seedData';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Rol)
    private readonly rol: Repository<Rol>) { };

  async seed() {

    const userDB = await this.user.findOneBy({ username: 'admin' });
    if (!userDB) {
      const roldb = this.rol.create({ ...rolSeed });
      userSeed.password = await this.hashPassword(userSeed.password);
      const users = this.user.create({
        ...userSeed,
        roles: rolSeed.map(rol => this.rol.create({ ...rol })),
      });
      await this.user.save(users);
    }

  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async findByUsername(username: string) {
    return await this.user.find({
      select: { username: true, password: true },
      where: [{ username }],
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  }

  async create(userDTO: UserDTO): Promise<User> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = this.user.create({ ...userDTO, password: hash });
    return await this.user.save(newUser);
    // return await newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.user.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.user.findOneBy({ id });
  }

  async update(id: string, userDTO: UserDTO): Promise<User> {
    const hash = await this.hashPassword(userDTO.password);
    const user = await this.user.preload({ ...userDTO, password: hash });

    if (!user) throw new NotFoundException(`User with ${id} not found`);

    try {
      await this.user.save(user);
      return user;
    } catch (error) {
      throw new UnprocessableEntityException(`User with ${id} not found`);
    }

  }

  async delete(id: string) {
    /* await this.user.findOneBy(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    }; */
  }
}
