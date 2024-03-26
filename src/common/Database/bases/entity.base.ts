import { PrimaryGeneratedColumn } from 'typeorm';
import { ObjectBase } from './object.base';
import { Field } from '@nestjs/graphql';

export abstract class EntityBase<TEntity> extends ObjectBase<TEntity> {
  @Field(() => Number)
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;
}
