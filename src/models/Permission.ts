import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Menu } from './Menu';
import { Role } from './Role';
import { Status } from './Status';
import { PermissionFieldMapping } from './PermissionFieldMapping';
import { PermissionPageMapping } from './PermissionPageMapping';

export class Permission extends Model
{
    public id?: number;
    public name?: string;
    public roleId?: number;
    public menuId?: number;
    public statusId?: number;
    public menu?: Menu;
    public role?: Role;
    public status?: Status;
    public permissionFieldMappings?: PermissionFieldMapping[];
    public permissionPageMappings?: PermissionPageMapping[];
}
