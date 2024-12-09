import { NotionRelation } from './notion-relation';
import { NotionSelect, NotionTitle } from './notion-property';
import { NotionDate } from './notion-date';

export interface NotionRetrospectiveProperties {
  Sprint?: NotionTitle;
  Team?: NotionSelect;
  Date?: NotionDate;
  'Set the Stage'?: { relation: NotionRelation[] };
  'Gather data'?: { relation: NotionRelation[] };
  'Generate insights'?: { relation: NotionRelation[] };
  'Decide what to do'?: { relation: NotionRelation[] };
  Closing?: { relation: NotionRelation[] };
}
