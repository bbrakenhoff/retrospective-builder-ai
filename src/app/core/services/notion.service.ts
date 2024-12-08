import { Injectable } from '@angular/core';
import { Client } from '@notionhq/client';
import { from, map, Observable, share } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RetrospectiveElementAdapter } from '../adapters/retrospective-element.adapter';
import { RetrospectiveElement } from '../models/retrospective-element.model';
import { RetrospectiveAdapter } from '../adapters/retrospective.adapter';
import { NotionQueryResponse } from '../types';
import { Retrospective } from '../models';

@Injectable({
  providedIn: 'root',
})
export class NotionService {
  constructor(
    private readonly notion: Client,
    private readonly retrospectiveElementAdapter: RetrospectiveElementAdapter,
    private readonly retrospectiveAdapter: RetrospectiveAdapter
  ) {}

  getRetrospectiveElements$(): Observable<RetrospectiveElement[]> {
    return from(
      this.notion.databases.query({
        database_id: environment.notion.databases.retrospectiveElements,
      })
    ).pipe(
      map(response =>
        this.retrospectiveElementAdapter.fromNotionResponse(
          response as NotionQueryResponse
        )
      )
    );
  }

  getRetrospectives$(): Observable<Retrospective[]> {
    return from(
      this.notion.databases.query({
        database_id: environment.notion.databases.retrospectives,
      })
    ).pipe(
      map(response =>
        this.retrospectiveAdapter.mapNotionResponseToRetrospectives(
          response as NotionQueryResponse
        )
      )
    );
  }
}
