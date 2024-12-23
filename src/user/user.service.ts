import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userEntity = new UserEntity(createUserDto);
    await this.preconditionsUserCreate(userEntity);
    await userEntity.hashPassword();
    const user = await this.userRepository.create(userEntity);
    return user;
  }

  async findAllUsers() {
    return this.userRepository.findAll();
  }

  findOneUser(id: number) {
    return this.userRepository.findOneById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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

  async preconditionsUserCreate(userEntity: UserEntity) {
    // user is exist
    const isUserExist = await this.userRepository.getUserByCriteria({
      email: userEntity.email,
    });
    if (isUserExist) {
      throw new ConflictException('El usuario ya existe con este email');
    }
  }

  async generateAccessToken(user: UserEntity) {
    const tokenSecret = this.configService.get<string>('SECRET_TOKEN');
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
}
