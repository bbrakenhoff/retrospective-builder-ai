import {
  NotionMultiSelect,
  NotionRichText,
  NotionSelect,
  NotionTitle,
} from './notion-property';
import { NotionRelation } from './notion-relation';

export interface NotionRetrospectiveElementProperties {
  Theme?: NotionSelect;
  Phase?: NotionMultiSelect;
  Name?: NotionTitle;
  Link?: NotionRichText;
  'Attendance options'?: NotionMultiSelect;
  '↔️ Retrospective planning'?: { relation: NotionRelation[] };
}
