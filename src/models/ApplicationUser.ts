import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { UserStatus } from './UserStatus';
import { ApplicationUserRoleMapping } from './ApplicationUserRoleMapping';

export class ApplicationUser extends Model 
{
    public id?: number;
    public username?: string;
    public password?: string;
    public displayName?: string;
    public email?: string;
    public phone?: string;
    public userStatusId?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public userStatus?: UserStatus;
    public applicationUserRoleMappings?: ApplicationUserRoleMapping[];
    public errors?: ErrorMap<ApplicationUser>;
}
