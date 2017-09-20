
import {SelectItem} from 'primeng/primeng';

export interface RecursiveSelectItem extends SelectItem {
  children: RecursiveSelectItem[];
}
