import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';

export class Image extends Model {
  public id?: number;
  public name?: string;
  public url?: string;
  public createdAt?: Moment;
  public updatedAt?: Moment;
  public deletedAt?: Moment;
}
