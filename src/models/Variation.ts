import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { VariationGrouping } from './VariationGrouping';

export class Variation extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public variationGroupingId?: number;
    public variationGrouping?: VariationGrouping;
}
