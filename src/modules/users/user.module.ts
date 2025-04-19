import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserRepositoryService } from './infrastructure/repositories/user.repository.service';

@Module({
  controllers: [UserController],
  providers: [UserRepositoryService]
})
export class UserModule {}
