import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(where: Partial<User>): Promise<User | undefined> {
    return this.userModel.findOne(where).lean();
  }

  async create(data: CreateUserDTO): Promise<User> {
    const createdUser = new this.userModel(await this.normalizeUser(data));
    return createdUser.save();
  }

  async findWithPassword(email: string): Promise<User | undefined> {
    return this.userModel
      .findOne({ email })
      .select('+password')
      .lean();
  }

  private async normalizeUser(data: CreateUserDTO) {
    if (data.password) {
      return {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      };
    }
    return data;
  }
}
