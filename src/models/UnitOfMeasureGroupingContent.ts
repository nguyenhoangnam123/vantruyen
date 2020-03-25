import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { UnitOfMeasure } from './UnitOfMeasure';
import { UnitOfMeasureGrouping } from './UnitOfMeasureGrouping';

export class UnitOfMeasureGroupingContent extends Model 
{
    public id?: number;
    public unitOfMeasureGroupingId?: number;
    public unitOfMeasureId?: number;
    public factor?: number;
    public unitOfMeasure?: UnitOfMeasure;
    public unitOfMeasureGrouping?: UnitOfMeasureGrouping;
}
