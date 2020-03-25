import { Model } from 'core/models';
import { Moment } from 'moment';

export class Status extends Model {
  public id?: number;
  public code?: string;
  public name?: string;
}
