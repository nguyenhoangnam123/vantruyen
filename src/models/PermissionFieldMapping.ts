import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Field } from './Field';
import { Permission } from './Permission';

export class PermissionFieldMapping extends Model 
{
    public permissionId?: number;
    public fieldId?: number;
    public value?: string;
    public field?: Field;
    public permission?: Permission;
    public errors?: ErrorMap<PermissionFieldMapping>;
}
