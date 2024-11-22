import { Injectable } from '@angular/core';
import { Client } from '@notionhq/client';
import { Observable, from, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RetrospectiveElementAdapter } from '../adapters/retrospective-element.adapter';
import { RetrospectiveElement } from '../models/retrospective-element.model';

@Injectable({
  providedIn: 'root'
})
export class NotionService {
  private readonly notion: Client;

  public constructor(
    private retrospectiveElementAdapter: RetrospectiveElementAdapter
  ) {
    this.notion = new Client({
      auth: environment.notion.apiKey,
    });
  }

  public getRetrospectiveElements$(): Observable<RetrospectiveElement[]> {
    return from(
      this.notion.databases.query({
        database_id: environment.notion.databases.retrospectiveElements
      })
    ).pipe(
      map(response => this.retrospectiveElementAdapter.fromNotionResponse(response))
    );
  }

  public getRetrospectives$():Observable<any> {
    return from(this.notion.databases.query({
      database_id: environment.notion.databases.retrospectives
    })
  );
  }
} 
