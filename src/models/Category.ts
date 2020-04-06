import { Model } from 'core/models';
import { Moment } from 'moment';
export class Category extends Model {
  id: number;
  name: string;
  nameAscii: string;
  Details: string;
  DateCreated: Moment;
  isHot: boolean;
  isNew: boolean;
  priority: number;
  link: string;
}

export default Category;
