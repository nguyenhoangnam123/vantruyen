import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Role } from './Role';
import { View } from './View';
import { PermissionFieldMapping } from './PermissionFieldMapping';
import { PermissionPageMapping } from './PermissionPageMapping';

export class Permission extends Model 
{
    public id?: number;
    public name?: string;
    public roleId?: number;
    public viewId?: number;
    public role?: Role;
    public view?: View;
    public permissionFieldMappings?: PermissionFieldMapping[];
    public permissionPageMappings?: PermissionPageMapping[];
    public errors?: ErrorMap<Permission>;
}
