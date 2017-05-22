import { GeneAnnotationClientPage } from './app.po';

describe('gene-annotation-client App', () => {
  let page: GeneAnnotationClientPage;

  beforeEach(() => {
    page = new GeneAnnotationClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
