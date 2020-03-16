import {IdFilter} from 'core/filters';
import {ModelFilter} from 'core/models';

export class ApplicationUserRoleMappingFilter extends ModelFilter {
  public applicationUserId?: IdFilter = new IdFilter();

  public roleId?: IdFilter = new IdFilter();
}
