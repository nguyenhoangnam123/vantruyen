import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Field } from './Field';
import { Page } from './Page';
import { Permission } from './Permission';

export class Menu extends Model
{
    public id?: number;
    public name?: string;
    public path?: string;
    public isDeleted?: boolean;
    public fields?: Field[];
    public pages?: Page[];
    public permissions?: Permission[];
}
