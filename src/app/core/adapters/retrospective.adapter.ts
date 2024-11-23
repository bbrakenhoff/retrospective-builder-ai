import { Injectable } from '@angular/core';
import { Retrospective } from '../models/retrospective.model';

@Injectable({
  providedIn: 'root'
})
export class RetrospectiveAdapter {
  public fromNotionResponse(notionResponse: any): Retrospective[] {
    if (!notionResponse?.results) {
      return [];
    }

    return notionResponse.results.map((item: any) => this.fromNotionPage(item));
  }

  private fromNotionPage(notionPage: any): Retrospective {
    const properties = notionPage.properties;

    return {
      id: notionPage.id,
      createdTime: new Date(notionPage.created_time),
      lastEditedTime: new Date(notionPage.last_edited_time),
      sprint: this.extractText(properties.Sprint?.title?.[0]?.plain_text),
      team: this.extractText(properties.Team?.select?.name),
      date: this.extractDate(properties.Date?.date?.start),
      planningStatus: this.extractText(properties['Planning status']?.formula?.string),
      url: notionPage.url,
      // Phase relations
      setTheStageElements: this.extractRelation(properties['Set the Stage']?.relation),
      gatherDataElements: this.extractRelation(properties['Gather data']?.relation),
      generateInsightsElements: this.extractRelation(properties['Generate insights']?.relation),
      decideWhatToDoElements: this.extractRelation(properties['Decide what to do']?.relation),
      closingElements: this.extractRelation(properties['Closing']?.relation)
    };
  }

  private extractText(value: any): string {
    return value || '';
  }

  private extractDate(dateString: string | null): Date | null {
    return dateString ? new Date(dateString) : null;
  }

  private extractRelation(relation: any[]): string[] {
    if (!Array.isArray(relation)) {
      return [];
    }
    return relation.map(item => item.id).filter(Boolean);
  }
} 