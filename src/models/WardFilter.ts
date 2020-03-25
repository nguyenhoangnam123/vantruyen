import { IdFilter, StringFilter, NumberFilter, DateFilter  } from 'core/filters';
import { ModelFilter } from 'core/models';

export class WardFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public priority?: NumberFilter = new NumberFilter();
  public districtId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
}