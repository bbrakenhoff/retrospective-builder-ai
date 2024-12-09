import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Retrospective, RetrospectiveElement } from '../models';
import {
  NotionPage,
  NotionQueryResponse,
  NotionRelation,
  NotionRetrospectiveProperties,
} from '../types';
import { BaseAdapter } from './base.adapter';
import { NotionTitle } from '../types';

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

      // Phase relations
      phases: {
        setTheStage: this.extractRetrospectiveElement(
          properties['Set the Stage']?.relation
        ),
        gatherData: this.extractRetrospectiveElement(
          properties['Gather data']?.relation
        ),
        generateInsights: this.extractRetrospectiveElement(
          properties['Generate insights']?.relation
        ),
        decideWhatToDo: this.extractRetrospectiveElement(
          properties['Decide what to do']?.relation
        ),
        closing: this.extractRetrospectiveElement(
          properties['Closing']?.relation
        ),
      },
    };
  }

  private extractRetrospectiveElement(
    relation: NotionRelation[] | null = null
  ): RetrospectiveElement | null {
    if (relation && relation.length > 0) {
      return {
        id: this.extractRelation(relation)[0],
        createdTime: null,
        lastEditedTime: null,
        theme: null,
        phase: [],
        name: null,
        link: null,
        attendanceOptions: [],
        usedInRetrospectiveIds: [],
      };
    }

    return null;
  }
}
