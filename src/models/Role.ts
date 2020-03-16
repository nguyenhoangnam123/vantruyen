import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { ApplicationUserRoleMapping } from './ApplicationUserRoleMapping';
import { Permission } from './Permission';

export class Role extends Model 
{
    public id?: number;
    public name?: string;
    public applicationUserRoleMappings?: ApplicationUserRoleMapping[];
    public permissions?: Permission[];
    public errors?: ErrorMap<Role>;
}
