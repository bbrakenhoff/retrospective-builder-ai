import { testDataStore } from '../../../test/test-data-store';
import { RetrospectiveAdapter } from './retrospective.adapter';

describe('RetrospectiveAdapter', () => {
  const testData = {
    notionQueryResponse: testDataStore.getRetrospectivesQueryResponse(),
    retrospectives: testDataStore.getRetrospectives(),
  };

  let adapter: RetrospectiveAdapter;

  beforeEach(() => {
    adapter = new RetrospectiveAdapter();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('mapNotionPageToRetrospective', () => {
    it('should map NotionPage to RetrospectiveElement', () => {
      const results = adapter.mapNotionResponseToRetrospectives(
        testData.notionQueryResponse
      );
      expect(results).toEqual(testData.retrospectives);
    });
  });
});
