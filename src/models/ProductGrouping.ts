import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
// import { ProductGrouping } from './ProductGrouping';
import { Product } from './Product';

export class ProductGrouping extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public parentId?: number;
    public path?: string;
    public description?: string;
    public isActive?: boolean;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public parent?: ProductGrouping;
    public products?: Product[];
}
