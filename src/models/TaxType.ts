import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Product } from './Product';

export class TaxType extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public percentage?: number;
    public isActive?: boolean;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public products?: Product[];
}
