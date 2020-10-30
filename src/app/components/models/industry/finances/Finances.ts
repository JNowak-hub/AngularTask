import {Industry} from '../Industry';

export class Finances implements Industry {
  name = 'Finances';
  subcategory: string[] = ['Bank', 'Insurance'];
}
