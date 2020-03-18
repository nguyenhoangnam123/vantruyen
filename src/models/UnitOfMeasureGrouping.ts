import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { UnitOfMeasure } from './UnitOfMeasure';
import { UnitOfMeasureGroupingContent } from './UnitOfMeasureGroupingContent';

export class UnitOfMeasureGrouping extends Model
{
    public id?: number;
    public name?: string;
    public unitOfMeasureId?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public unitOfMeasure?: UnitOfMeasure;
    public unitOfMeasureGroupingContents?: UnitOfMeasureGroupingContent[];
}
