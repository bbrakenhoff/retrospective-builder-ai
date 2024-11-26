import { Injectable } from '@angular/core';
import { RetrospectiveElement } from '../models/retrospective-element.model';
import {
  NotionMultiSelect,
  NotionPage,
  NotionQueryResponse,
  NotionRetrospectiveElementProperties,
  NotionRichText,
  NotionTitle,
} from '../types';

import { BaseAdapter } from './base.adapter';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveElementAdapter extends BaseAdapter {
  fromNotionResponse(
    notionResponse: NotionQueryResponse
  ): RetrospectiveElement[] {
    if (!notionResponse?.results) {
      return [];
    }

    return notionResponse.results.map((item: NotionPage) =>
      this.fromNotionPage(item)
    );
  }

  private fromNotionPage(notionPage: NotionPage): RetrospectiveElement {
    const properties =
      notionPage.properties as NotionRetrospectiveElementProperties;

    return {
      id: notionPage.id,
      createdTime: new Date(notionPage.created_time),
      lastEditedTime: new Date(notionPage.last_edited_time),
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
