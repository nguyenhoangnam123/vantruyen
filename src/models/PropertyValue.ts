import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Property } from './Property';

export class PropertyValue extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public propertyId?: number;
    public isActive?: boolean;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public property?: Property;
}
