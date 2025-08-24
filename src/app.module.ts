import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { LeadsModule } from './leads/leads.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'root',
      password: 'root',
      database: 'db_brighte_eats',
      options: { encrypt: false },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),

    LeadsModule,
  ],
})
export class AppModule { }