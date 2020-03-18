import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Product } from './Product';
import { UnitOfMeasureGroupingContent } from './UnitOfMeasureGroupingContent';
import { UnitOfMeasureGrouping } from './UnitOfMeasureGrouping';

export class UnitOfMeasure extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public description?: string;
    public isActive?: boolean;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public products?: Product[];
    public unitOfMeasureGroupingContents?: UnitOfMeasureGroupingContent[];
    public unitOfMeasureGroupings?: UnitOfMeasureGrouping[];
}
