import { Model } from 'core/models';
import { ErrorMap } from 'react3l';
import { Moment } from 'moment';

export class Product extends Model {
  id?: number;
  name?: string;
  nameAscii?: string;
  Link?: string;
  summary?: string;
  pictureId?: number;
  urlAvatar?: string;
  totalView?: number;
  totalComment?: number;
  totalLike?: number;
  public status?: string;
  public dateUpdate?: Moment;
  isFull?: boolean;
  isHot?: boolean;
  author?: string;
  rank?: number;
}
