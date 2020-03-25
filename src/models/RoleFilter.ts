import { IdFilter, StringFilter, NumberFilter, DateFilter  } from 'core/filters';
import { ModelFilter } from 'core/models';

export class RoleFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public statusId?: IdFilter = new IdFilter();
}