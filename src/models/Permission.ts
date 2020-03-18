import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Menu } from './Menu';
import { Role } from './Role';
import { PermissionFieldMapping } from './PermissionFieldMapping';
import { PermissionPageMapping } from './PermissionPageMapping';

export class Permission extends Model
{
    public id?: number;
    public name?: string;
    public roleId?: number;
    public menuId?: number;
    public menu?: Menu;
    public role?: Role;
    public permissionFieldMappings?: PermissionFieldMapping[];
    public permissionPageMappings?: PermissionPageMapping[];
}
