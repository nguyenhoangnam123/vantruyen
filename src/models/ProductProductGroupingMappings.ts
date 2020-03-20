import { Model } from 'core/models';
import { ProductGrouping } from './ProductGrouping';
import { Product } from './Product';

export class ProductProductGroupingMappings extends Model {
    public productId?: number;
    public productGroupingId?: number;
    public Product?: Product;
    public ProductGrouping?: ProductGrouping;
}