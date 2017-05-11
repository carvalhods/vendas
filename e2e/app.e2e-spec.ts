import { VendasPage } from './app.po';

describe('vendas App', () => {
  let page: VendasPage;

  beforeEach(() => {
    page = new VendasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
