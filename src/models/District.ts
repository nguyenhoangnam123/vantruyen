import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Province } from './Province';
import { Store } from './Store';
import { Ward } from './Ward';

export class District extends Model
{
    public id?: number;
    public name?: string;
    public priority?: number;
    public provinceId?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public province?: Province;
    public stores?: Store[];
    public wards?: Ward[];
}
