import { PrimaryGeneratedColumn } from 'typeorm';
import { ObjectBase } from './object.base';

export abstract class EntityBase<TEntity> extends ObjectBase<TEntity> {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;
}
