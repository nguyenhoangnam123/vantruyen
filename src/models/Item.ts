import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Product } from './Product';

export class Item extends Model
{
    public id?: number;
    public productId?: number;
    public code?: string;
    public name?: string;
    public scanCode?: string;
    public salePrice?: number;
    public retailPrice?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public product?: Product;
}
