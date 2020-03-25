import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Status } from './Status';

export class Supplier extends Model 
{
    public id?: number;
    public code?: string;
    public name?: string;
    public taxCode?: string;
    public statusId?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public status?: Status;
}
