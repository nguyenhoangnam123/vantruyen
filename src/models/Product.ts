import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';
import { Brand } from './Brand';
import { ProductGrouping } from './ProductGrouping';
import { ProductType } from './ProductType';
import { Supplier } from './Supplier';
import { TaxType } from './TaxType';
import { UnitOfMeasure } from './UnitOfMeasure';
import { Item } from './Item';
import { ProductImageMapping } from './ProductImageMapping';
import { VariationGrouping } from './VariationGrouping';

export class Product extends Model
{
    public id?: number;
    public code?: string;
    public supplierCode?: string;
    public name?: string;
    public description?: string;
    public scanCode?: string;
    public productGroupingId?: number;
    public productTypeId?: number;
    public supplierId?: number;
    public brandId?: number;
    public unitOfMeasureId?: number;
    public salePrice?: number;
    public retailPrice?: number;
    public taxTypeId?: number;
    public isActive?: boolean;
    public createdAt?: Moment;
    public updatedAt?: Moment;
    public deletedAt?: Moment;
    public brand?: Brand;
    public productGrouping?: ProductGrouping;
    public productType?: ProductType;
    public supplier?: Supplier;
    public taxType?: TaxType;
    public unitOfMeasure?: UnitOfMeasure;
    public items?: Item[];
    public productImageMappings?: ProductImageMapping[];
    public variationGroupings?: VariationGrouping[];
}