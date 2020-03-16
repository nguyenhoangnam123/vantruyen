import { IdFilter, StringFilter, NumberFilter, DateFilter  } from 'core/filters';
import { ModelFilter } from 'core/models';

export class PermissionPageMappingFilter extends ModelFilter  {
  public permissionId?: IdFilter = new IdFilter();
  public pageId?: IdFilter = new IdFilter();
}