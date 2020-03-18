import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Menu } from './Menu';
import { PermissionFieldMapping } from './PermissionFieldMapping';

export class Field extends Model
{
    public id?: number;
    public name?: string;
    public type?: string;
    public menuId?: number;
    public isDeleted?: boolean;
    public menu?: Menu;
    public permissionFieldMappings?: PermissionFieldMapping[];
}
