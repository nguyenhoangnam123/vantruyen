import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Status } from './Status';
import { Store } from './Store';

export class Organization extends Model {
  public id?: number;
  public code?: string;
  public name?: string;
  public parentId?: number;
  public path?: string;
  public level?: number;
  public statusId?: number;
  public phone?: string;
  public address?: string;
  public latitude?: number;
  public longitude?: number;
  public createdAt?: Moment;
  public updatedAt?: Moment;
  public deletedAt?: Moment;
  public parent?: Organization;
  public status?: Status;
  public stores?: Store[];
}
