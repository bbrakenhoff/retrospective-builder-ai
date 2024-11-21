import { Injectable } from '@angular/core';
import { Client } from '@notionhq/client';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotionService {
  private readonly notion: Client;

  public constructor() {
    this.notion = new Client({
      auth: environment.notion.apiKey,
    });
  }

  public getRetrospectiveElements$(): Observable<any> {
    return from(
      this.notion.databases.query({
        database_id: environment.notion.databases.retrospectiveElements
      })
    );
  }
} 