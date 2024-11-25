import { DateTime } from 'luxon';
import { NotionRelation } from '../types';

export abstract class BaseAdapter {
  protected extractText(value: string | undefined): string {
    return value || '';
  }

  protected extractDate(
    dateString: string | null | undefined
  ): DateTime | null {
    return dateString ? DateTime.fromISO(dateString) : null;
  }

  protected extractRelation(relation: NotionRelation[] | undefined): string[] {
    if (!Array.isArray(relation)) {
      return [];
    }
    return relation.map(item => item.id).filter(Boolean);
  }
}
