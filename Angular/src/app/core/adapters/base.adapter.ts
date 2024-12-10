import { DateTime } from 'luxon';
import { NotionMultiSelect, NotionRelation, NotionRichText } from '../types';

export abstract class BaseAdapter {
  protected extractText(value: string | null): string | null {
    return value || null;
  }
  protected extractRichText(
    richText: NotionRichText | undefined
  ): string | null {
    return richText?.rich_text?.[0]?.plain_text ?? null;
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
  ): string | null {
    return titleProperty?.title?.[0]?.plain_text ?? null;
  }
}
