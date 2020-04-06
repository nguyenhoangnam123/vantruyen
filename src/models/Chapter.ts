import { Moment } from 'moment';
import { Model } from 'core/models';
export class Chapter extends Model {
  id: number;
  details: string;
  chapterId: number;
  linkNetTruyen: string;
  chapterNetTruyenID: number;
  DateCreated: Moment;
}
export default Chapter;
