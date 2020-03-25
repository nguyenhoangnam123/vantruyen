import { IdFilter, StringFilter, NumberFilter, DateFilter  } from 'core/filters';
import { ModelFilter } from 'core/models';

export class UnitOfMeasureGroupingFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public unitOfMeasureId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
}