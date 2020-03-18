import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { ProductImageMapping } from './ProductImageMapping';
import { StoreImageMapping } from './StoreImageMapping';

export class Image extends Model
{
    public id?: number;
    public name?: string;
    public url?: string;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public productImageMappings?: ProductImageMapping[];
    public storeImageMappings?: StoreImageMapping[];
}
