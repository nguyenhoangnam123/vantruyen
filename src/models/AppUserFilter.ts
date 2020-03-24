import { IdFilter, StringFilter, NumberFilter, DateFilter  } from 'core/filters';
import { ModelFilter } from 'core/models';

export class AppUserFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public username?: StringFilter = new StringFilter();
  public password?: StringFilter = new StringFilter();
  public displayName?: StringFilter = new StringFilter();
  public email?: StringFilter = new StringFilter();
  public phone?: StringFilter = new StringFilter();
  public userStatusId?: IdFilter = new IdFilter();
}