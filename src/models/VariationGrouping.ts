import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Product } from './Product';
import { Variation } from './Variation';

export class VariationGrouping extends Model
{
    public id?: number;
    public name?: string;
    public productId?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public product?: Product;
    public variations?: Variation[];
}
