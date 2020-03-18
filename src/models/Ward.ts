import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { District } from './District';
import { Store } from './Store';

export class Ward extends Model
{
    public id?: number;
    public name?: string;
    public priority?: number;
    public districtId?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public district?: District;
    public stores?: Store[];
}
