import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Image } from './Image';
import { Store } from './Store';

export class StoreImageMapping extends Model
{
    public storeId?: number;
    public imageId?: number;
    public image?: Image;
    public store?: Store;
}
