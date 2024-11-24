import { Injectable } from '@angular/core';
import { Client } from '@notionhq/client';
import { Observable, from, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RetrospectiveElementAdapter } from '../adapters/retrospective-element.adapter';
import { RetrospectiveElement } from '../models/retrospective-element.model';
import { RetrospectiveAdapter } from '../adapters/retrospective.adapter';

@Injectable({
  providedIn: 'root'
})
export class NotionService {
  private readonly notion: Client;

  constructor(
    private readonly retrospectiveElementAdapter: RetrospectiveElementAdapter,
    private readonly retrospectiveAdapter: RetrospectiveAdapter
  ) {
    this.notion = new Client({
      auth: environment.notion.apiKey,
    });
  }

  getRetrospectiveElements$(): Observable<RetrospectiveElement[]> {
    return from(
      this.notion.databases.query({
        database_id: environment.notion.databases.retrospectiveElements
      })
    ).pipe(
      map(response => this.retrospectiveElementAdapter.fromNotionResponse(response))
    );
  }

  getRetrospectives$(): Observable<any> {
    return from(this.notion.databases.query({
      database_id: environment.notion.databases.retrospectives
    })
  ).pipe(
      map(response => this.retrospectiveAdapter.fromNotionResponse(response))
    );
  }
} 
