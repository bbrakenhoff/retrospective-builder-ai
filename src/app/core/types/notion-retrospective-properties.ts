import { NotionRelation } from './notion-relation';

export interface NotionRetrospectiveProperties {
  Sprint?: { title: [{ plain_text: string }] };
  Team?: { select: { name: string } };
  Date?: { date: { start: string } };
  'Set the Stage'?: { relation: NotionRelation[] };
  'Gather data'?: { relation: NotionRelation[] };
  'Generate insights'?: { relation: NotionRelation[] };
  'Decide what to do'?: { relation: NotionRelation[] };
  Closing?: { relation: NotionRelation[] };
}
