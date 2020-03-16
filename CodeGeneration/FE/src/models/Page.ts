import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { View } from './View';
import { PermissionPageMapping } from './PermissionPageMapping';

export class Page extends Model
{
    public id?: number;
    public name?: string;
    public path?: string;
    public viewId?: number;
    public isDeleted?: boolean;
    public view?: View;
    public permissionPageMappings?: PermissionPageMapping[];
    public errors?: ErrorMap<Page>;
}
