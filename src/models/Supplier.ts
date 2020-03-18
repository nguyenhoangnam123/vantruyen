import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Product } from './Product';

export class Supplier extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public taxCode?: string;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public products?: Product[];
}
