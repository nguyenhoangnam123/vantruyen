import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Brand } from './Brand';
import { ProductType } from './ProductType';
import { Status } from './Status';
import { Supplier } from './Supplier';
import { TaxType } from './TaxType';
import { UnitOfMeasure } from './UnitOfMeasure';
import { UnitOfMeasureGrouping } from './UnitOfMeasureGrouping';
import { Item } from './Item';
import { ProductImageMapping } from './ProductImageMapping';
import { ProductProductGroupingMapping } from './ProductProductGroupingMapping';
import { VariationGrouping } from './VariationGrouping';

export class Product extends Model 
{
    public id?: number;
    public code?: string;
    public supplierCode?: string;
    public name?: string;
    public description?: string;
    public scanCode?: string;
    public productTypeId?: number;
    public supplierId?: number;
    public brandId?: number;
    public unitOfMeasureId?: number;
    public unitOfMeasureGroupingId?: number;
    public salePrice?: number;
    public retailPrice?: number;
    public taxTypeId?: number;
    public statusId?: number;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public brand?: Brand;
    public productType?: ProductType;
    public status?: Status;
    public supplier?: Supplier;
    public taxType?: TaxType;
    public unitOfMeasure?: UnitOfMeasure;
    public unitOfMeasureGrouping?: UnitOfMeasureGrouping;
    public items?: Item[];
    public productImageMappings?: ProductImageMapping[];
    public productProductGroupingMappings?: ProductProductGroupingMapping[];
    public variationGroupings?: VariationGrouping[];
}
