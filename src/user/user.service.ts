import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userEntity = new UserEntity(createUserDto);
    await this.isUserExist(userEntity.getEmail());
    await userEntity.hashPassword();
    const user = await this.userRepository.create(userEntity);
    return user;
  }

  async findAllUsers(userDecoded: UserEntity) {
    this.validateRol(userDecoded, 'admin');
    return this.userRepository.findAll();
  }

  findOneUser(id: number, userDecoded: UserEntity) {
    userDecoded = new UserEntity(userDecoded);
    this.validateRol(userDecoded, 'admin');
    return this.userRepository.findOneById(id);
  }

  findOneUserMe(userDecoded: UserEntity) {
    userDecoded = new UserEntity(userDecoded);
    return this.userRepository.findOneById(userDecoded.getIdUser());
  }

  async updateSameUser(updateUserDto: UpdateUserDto, userDecoded: UserEntity) {
    if (userDecoded.email !== updateUserDto.email) {
      await this.isUserExist(updateUserDto.email);
    }
    userDecoded = new UserEntity(userDecoded);
    const userData = {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      birthdate: updateUserDto.birthdate,
      email: updateUserDto.email,
    };
    if (updateUserDto.password.length >= 8) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      userData['password'] = updateUserDto.password;
    }
    return this.userRepository.update(userDecoded.getIdUser(), userData);
  }

  async remove(id: number, userDecoded: UserEntity) {
    await this.validateRol(userDecoded, 'admin');
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.userRepository.remove(id);
  }

  async removeMe(userDecoded: UserEntity) {
    userDecoded = new UserEntity(userDecoded);
    this.userRepository.remove(userDecoded.getIdUser());
  }

  async userLogin(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.getUserByCriteria({
      email: loginUserDto.email,
    });
    if (!user || !(await user.validatePassword(loginUserDto.password))) {
      throw new NotFoundException('Usuario o contraseña incorrectos');
    }

    // generate token
    const accessToken = await this.generateAccessToken(user);
    return accessToken;
  }

  async isUserExist(userEmail: string) {
    // user is exist
    const isUserExist = await this.userRepository.getUserByCriteria({
      email: userEmail,
    });
    if (isUserExist) {
      throw new ConflictException('El usuario ya existe con este email');
    }
  }

  async generateAccessToken(user: UserEntity) {
    const tokenSecret = this.configService.get<string>('JWT_SECRET');
    const payload = {
      id_user: user.getIdUser(),
      firstname: user.getFirstName(),
      lastname: user.getLastName(),
      rol: user.getRol(),
    };
    const accessToken = await this.jwt.sign(payload, {
      secret: tokenSecret,
      expiresIn: '1h',
    });
    return { accessToken };
  }

  async validateIsSameUser(userDecoded: UserEntity) {
    userDecoded = new UserEntity(userDecoded);
    const user = await this.userRepository.getUserByCriteria({
      id_user: userDecoded.getIdUser(),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      userDecoded.getEmail() !== user.getEmail() ||
      userDecoded.getRol() !== user.getRol()
    ) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action.',
      );
    }
  }

  async validateRol(userDecoded: UserEntity, rol: string) {
    userDecoded = new UserEntity(userDecoded);
    if (userDecoded.getRol() !== rol) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action.',
      );
    }
  }
}
