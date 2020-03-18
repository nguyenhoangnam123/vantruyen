import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Store } from './Store';

export class StoreGrouping extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public parentId?: number;
    public path?: string;
    public level?: number;
    public isActive?: boolean;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public stores?: Store[];
}
