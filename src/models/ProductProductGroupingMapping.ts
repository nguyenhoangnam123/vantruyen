import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Product } from './Product';
import { ProductGrouping } from './ProductGrouping';

export class ProductProductGroupingMapping extends Model 
{
    public productId?: number;
    public productGroupingId?: number;
    public product?: Product;
    public productGrouping?: ProductGrouping;
}
