import { IdFilter, StringFilter, NumberFilter, DateFilter  } from 'core/filters';
import { ModelFilter } from 'core/models';

export class ProductFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public supplierCode?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public scanCode?: StringFilter = new StringFilter();
  public productTypeId?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
  public brandId?: IdFilter = new IdFilter();
  public unitOfMeasureId?: IdFilter = new IdFilter();
  public unitOfMeasureGroupingId?: IdFilter = new IdFilter();
  public salePrice?: NumberFilter = new NumberFilter();
  public retailPrice?: NumberFilter = new NumberFilter();
  public taxTypeId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
}