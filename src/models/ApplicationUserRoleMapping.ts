import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { ApplicationUser } from './ApplicationUser';
import { Role } from './Role';

export class ApplicationUserRoleMapping extends Model 
{
    public applicationUserId?: number;
    public roleId?: number;
    public applicationUser?: ApplicationUser;
    public role?: Role;
    public errors?: ErrorMap<ApplicationUserRoleMapping>;
}
