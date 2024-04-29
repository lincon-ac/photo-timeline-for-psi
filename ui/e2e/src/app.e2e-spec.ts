import { AppPage } from './app.po';

describe('Insta FCVS', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('deve exibir mensagem de boas-vindas', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Bem vindo ao Insta FCVS!');
  });
});
