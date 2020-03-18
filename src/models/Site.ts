import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';

export class Site extends Model
{
    public id?: number;
    public name?: string;
    public uRL?: string;
    public status?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
}
