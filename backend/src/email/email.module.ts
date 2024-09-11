import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersView } from 'src/entity/usersView.entity';
import { DataUtilsModule } from 'src/repository/DataUtils.module';

@Module({
  imports: [
    AuthModule,
    DataUtilsModule,
    TypeOrmModule.forFeature([UsersView]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST, // seu host SMTP
          port: parseInt(process.env.EMAIL_PORT, 10),
          secure: process.env.EMAIL_PORT === '465',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        },
        defaults: {
          from: `"No Reply" <${process.env.EMAIL_USER}>`, // remetente padrão
        },
        template: {
          dir: join('src/email/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
