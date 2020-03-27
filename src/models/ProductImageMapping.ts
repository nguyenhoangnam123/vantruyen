import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Image } from './Image';
import { Product } from './Product';

export class ProductImageMapping extends Model
{
    public productId?: number;
    public imageId?: number;
    public image?: Image;
    public product?: Product;
}
