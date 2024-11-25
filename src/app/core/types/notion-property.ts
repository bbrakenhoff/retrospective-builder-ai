export interface NotionSelect {
  select: {
    name: string;
  };
}

export interface NotionMultiSelect {
  multi_select: {
    name: string;
  }[];
}

export interface NotionTitle {
  title: {
    plain_text: string;
  }[];
}

export interface NotionRichText {
  rich_text: {
    plain_text: string;
  }[];
}

export interface NotionRollupNumber {
  rollup: {
    number: number;
  };
}

export interface NotionRollupDate {
  rollup: {
    date: string;
  };
}

export interface NotionFormula<T> {
  formula: {
    [K in keyof T]: T[K];
  };
}

export interface NotionRollupArray<T> {
  rollup: {
    array: T[];
  };
}
