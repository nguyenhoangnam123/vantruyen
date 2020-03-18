import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { District } from './District';
import { Store } from './Store';

export class Province extends Model
{
    public id?: number;
    public name?: string;
    public priority?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public districts?: District[];
    public stores?: Store[];
}
