import {Industry} from '../Industry';

export class Travel implements Industry{
  name = 'Travel';
  subcategory: string[] = ['Domestic', 'Foreign'];
}
