import { Model } from 'core/models';
import { Moment } from 'moment';
export class Picture extends Model {
  id: number;
  name?: string;
  fileName: string;
  typeId: number;
  summary?: string;
  alt: string;
  link: string;
  sourceLink: string;
  size: number;
  DateCreated: Moment;
  DateUpdated: Moment;
  CreatedBy: Moment;
  UpdatedBy: Moment;
  isShow: boolean;
  isDeleted: boolean;
}
