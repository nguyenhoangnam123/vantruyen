import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { AppUserRoleMapping } from './AppUserRoleMapping';
import { Permission } from './Permission';

export class Role extends Model
{
    public id?: number;
    public name?: string;
    public appUserRoleMappings?: AppUserRoleMapping[];
    public permissions?: Permission[];
}
