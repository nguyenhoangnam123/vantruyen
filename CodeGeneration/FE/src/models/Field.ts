import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { View } from './View';
import { PermissionFieldMapping } from './PermissionFieldMapping';

export class Field extends Model
{
    public id?: number;
    public name?: string;
    public type?: string;
    public viewId?: number;
    public isDeleted?: boolean;
    public view?: View;
    public permissionFieldMappings?: PermissionFieldMapping[];
    public errors?: ErrorMap<Field>;
}
