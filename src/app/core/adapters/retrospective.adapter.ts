import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Retrospective } from '../models';
import { NotionQueryResponse, NotionPage, NotionRelation } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveAdapter {
  mapNotionResponseToRetrospectives(
    notionResponse: NotionQueryResponse
  ): Retrospective[] {
    if (!notionResponse?.results) {
      return [];
    }

    return notionResponse.results.map((item: NotionPage) =>
      this.mapNotionPageToRetrospective(item)
    );
  }

  private mapNotionPageToRetrospective(notionPage: NotionPage): Retrospective {
    const properties = notionPage.properties;

    return {
      id: notionPage.id,
      createdTime: DateTime.fromISO(notionPage.created_time),
      lastEditedTime: DateTime.fromISO(notionPage.last_edited_time),
      sprint: this.extractText(properties.Sprint?.title?.[0]?.plain_text),
      team: this.extractText(properties.Team?.select?.name),
      date: this.extractDate(properties.Date?.date?.start),

      url: notionPage.url,
      // Phase relations
      setTheStageElements: this.extractRelation(
        properties['Set the Stage']?.relation
      ),
      gatherDataElements: this.extractRelation(
        properties['Gather data']?.relation
      ),
      generateInsightsElements: this.extractRelation(
        properties['Generate insights']?.relation
      ),
      decideWhatToDoElements: this.extractRelation(
        properties['Decide what to do']?.relation
      ),
      closingElements: this.extractRelation(properties['Closing']?.relation),
    };
  }

  private extractText(value: string | undefined): string {
    return value || '';
  }

  private extractDate(dateString: string | null | undefined): DateTime | null {
    return dateString ? DateTime.fromISO(dateString) : null;
  }

  private extractRelation(relation: NotionRelation[] | undefined): string[] {
    if (!Array.isArray(relation)) {
      return [];
    }
    return relation.map(item => item.id).filter(Boolean);
  }
}
