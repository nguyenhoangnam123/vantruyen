import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { AppUser } from './AppUser';

export class UserStatus extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public appUsers?: AppUser[];
}
