import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Status } from './Status';
import { UnitOfMeasure } from './UnitOfMeasure';
import { UnitOfMeasureGroupingContent } from './UnitOfMeasureGroupingContent';

export class UnitOfMeasureGrouping extends Model
{
    public id?: number;
    public name?: string;
    public unitOfMeasureId?: number;
    public statusId?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public status?: Status;
    public unitOfMeasure?: UnitOfMeasure;
    public unitOfMeasureGroupingContents?: UnitOfMeasureGroupingContent[];
}
