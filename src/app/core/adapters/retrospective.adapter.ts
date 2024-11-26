import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Retrospective } from '../models';
import {
  NotionPage,
  NotionQueryResponse,
  NotionRetrospectiveProperties,
} from '../types';
import { BaseAdapter } from './base.adapter';
import { NotionTitle } from '../types/notion-property';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveAdapter extends BaseAdapter {
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
    const properties = notionPage.properties as NotionRetrospectiveProperties;

    return {
      id: notionPage.id,
      createdTime: DateTime.fromISO(notionPage.created_time),
      lastEditedTime: DateTime.fromISO(notionPage.last_edited_time),
      sprint: this.extractTitle(properties.Sprint as NotionTitle | undefined),
      team: this.extractText(properties.Team?.select?.name ?? ''),
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
}
