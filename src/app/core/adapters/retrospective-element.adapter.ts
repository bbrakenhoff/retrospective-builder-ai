import { Injectable } from '@angular/core';
import { RetrospectiveElement } from '../models/retrospective-element.model';
import { BaseAdapter } from './base.adapter';
import { NotionQueryResponse } from '../types';

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

    return notionResponse.results.map((item: Notion) =>
      this.fromNotionPage(item)
    );
  }

  private fromNotionPage(notionPage: any): RetrospectiveElement {
    const properties = notionPage.properties;

    return {
      id: notionPage.id,
      createdTime: new Date(notionPage.created_time),
      lastEditedTime: new Date(notionPage.last_edited_time),
      theme: this.extractText(properties.Theme?.select?.name),
      phase: this.extractMultiSelect(properties.Phase?.multi_select)?.[0] || '',
      name: this.extractText(properties.Name?.title?.[0]?.plain_text),
      link: this.extractText(properties.Link?.rich_text?.[0]?.plain_text),
      attendanceOptions: this.extractMultiSelect(
        properties['Attendance options']?.multi_select
      ),
      usedInTeams: this.extractArray(properties['Used in team']?.rollup?.array),
      usedOnDates: this.extractDateArray(
        properties['Used on date']?.rollup?.array
      ),
    };
  }

  private extractArray(array: any[]): string[] {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.map(item => String(item)).filter(Boolean);
  }

  private extractDateArray(array: any[]): Date[] {
    if (!Array.isArray(array)) {
      return [];
    }
    return array
      .map(item => this.extractDate(item))
      .filter((date): date is Date => date !== null);
  }

  private extractMultiSelect(multiSelect: any[]): string[] {
    if (!Array.isArray(multiSelect)) {
      return [];
    }
    return multiSelect.map(option => option.name).filter(Boolean);
  }
}
