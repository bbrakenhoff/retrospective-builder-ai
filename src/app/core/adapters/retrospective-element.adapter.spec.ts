import { RetrospectiveElementAdapter } from './retrospective-element.adapter';
import { testDataStore } from '../../../test/test-data-store';

fdescribe('RetrospectiveElementAdapter', () => {
  const testData = {
    notionQueryResponse: testDataStore.getRetrospectiveElementsQueryResponse(),
    retrospectiveElements: testDataStore.getRetrospectiveElements(),
  };

  let adapter: RetrospectiveElementAdapter;

  beforeEach(() => {
    adapter = new RetrospectiveElementAdapter();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('mapNotionPageToRetrospective', () => {
    it('should map NotionPage to RetrospectiveElement', () => {
      const result = adapter.mapNotionResponseToRetrospectives(
        testData.notionQueryResponse
      );
      expect(result).toEqual(testData.retrospectiveElements);
    });
  });
});
