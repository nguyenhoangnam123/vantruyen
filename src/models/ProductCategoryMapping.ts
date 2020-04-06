import { Model } from 'core/models';
import { ErrorMap } from 'react3l';

export class ProductCategoryMapping extends Model {
  id?: number;
  productId?: number;
  categoryId?: number;
}
