import { Model } from 'core/models';
import { Moment } from 'moment';
export class ProductChapterMapping extends Model {
  id: number;
  productId: number;
  chapterId: number;
  linkNetTruyen: string;
  chapterNetTruyenID: number;
  chapterName: string;
  DatePost: Moment;
  DateCreated: Moment;
  totalView: number;
  totalLike: number;
}
