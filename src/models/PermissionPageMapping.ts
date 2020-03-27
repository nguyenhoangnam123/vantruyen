import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Page } from './Page';
import { Permission } from './Permission';

export class PermissionPageMapping extends Model
{
    public permissionId?: number;
    public pageId?: number;
    public page?: Page;
    public permission?: Permission;
}
