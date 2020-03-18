import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { PropertyValue } from './PropertyValue';

export class Property extends Model
{
    public id?: number;
    public code?: string;
    public name?: string;
    public description?: string;
    public propertyTypeId?: number;
    public isSystem?: boolean;
    public isActive?: boolean;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public propertyValues?: PropertyValue[];
}
