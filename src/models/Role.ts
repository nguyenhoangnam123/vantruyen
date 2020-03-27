import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Status } from './Status';
import { Permission } from './Permission';

export class Role extends Model
{
    public id?: number;
    public name?: string;
    public statusId?: number;
    public status?: Status;
    public permissions?: Permission[];
}
