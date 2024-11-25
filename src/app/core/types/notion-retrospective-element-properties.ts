import {
  SelectPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  RollupPropertyItemObjectResponse,
  FormulaPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

export interface NotionRetrospectiveElementProperties {
  Theme?: SelectPropertyItemObjectResponse;
  Phase?: MultiSelectPropertyItemObjectResponse;
  Name?: TitlePropertyItemObjectResponse;
  Link?: RichTextPropertyItemObjectResponse;
  'Attendance options'?: MultiSelectPropertyItemObjectResponse;
  'Usage count'?: RollupPropertyItemObjectResponse;
  'Latest use date'?: RollupPropertyItemObjectResponse;
  'Latest use team'?: FormulaPropertyItemObjectResponse;
  'Used in team'?: RollupPropertyItemObjectResponse;
  'Used on date'?: RollupPropertyItemObjectResponse;
}
