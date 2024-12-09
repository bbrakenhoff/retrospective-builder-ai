import { Injectable } from '@angular/core';
import {
  NotionMultiSelect,
  NotionPage,
  NotionQueryResponse,
  NotionRetrospectiveElementProperties,
  NotionRichText,
  NotionTitle,
} from '../types';

import { BaseAdapter } from './base.adapter';
import { DateTime } from 'luxon';
import { RetrospectiveElement } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveElementAdapter extends BaseAdapter {
  mapNotionResponseToRetrospectives(
    notionResponse: NotionQueryResponse
  ): RetrospectiveElement[] {
    if (!notionResponse?.results) {
      return [];
    }

    return notionResponse.results.map((item: NotionPage) =>
      this.mapNotionPageToRetrospective(item)
    );
  }

  private mapNotionPageToRetrospective(
    notionPage: NotionPage
  ): RetrospectiveElement {
    const properties =
      notionPage.properties as NotionRetrospectiveElementProperties;

    return {
      id: notionPage.id,
      createdTime: DateTime.fromISO(notionPage.created_time),
      lastEditedTime: DateTime.fromISO(notionPage.last_edited_time),
      theme: this.extractText(properties.Theme?.select?.name ?? ''),
      phase: this.extractMultiSelect(properties.Phase as NotionMultiSelect),
      name: this.extractTitle(properties.Name as NotionTitle | undefined),
      link: this.extractRichText(properties.Link as NotionRichText | undefined),
      attendanceOptions: this.extractMultiSelect(
        properties['Attendance options'] as NotionMultiSelect
      ),
      usedInRetrospectiveIds: this.extractRelation(
        properties['↔️ Retrospective planning']?.relation
      ),
    };
  }
}
