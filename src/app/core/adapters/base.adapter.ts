import { DateTime } from 'luxon';
import { NotionRelation } from '../types';
import { NotionMultiSelect, NotionRichText } from '../types/notion-property';

export abstract class BaseAdapter {
  protected extractText(value: string): string {
    return value || '';
  }
  protected extractRichText(richText: NotionRichText | undefined): string {
    return richText?.rich_text?.[0]?.plain_text ?? '';
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

  protected extractMultiSelect(
    multiSelect: NotionMultiSelect | undefined
  ): string[] {
    if (!Array.isArray(multiSelect?.multi_select)) {
      return [];
    }
    return multiSelect.multi_select.map(option => option.name).filter(Boolean);
  }

  protected extractTitle(
    titleProperty: { title: { plain_text: string }[] } | undefined
  ): string {
    return titleProperty?.title?.[0]?.plain_text ?? '';
  }
}
