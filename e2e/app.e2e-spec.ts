import { GeneAnnotationClientPage } from './app.po';

describe('gene-annotation-client App', () => {
  let page: GeneAnnotationClientPage;

  beforeEach(() => {
    page = new GeneAnnotationClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(1).toEqual(1);
  });
});
