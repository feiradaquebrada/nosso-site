# Feira da Quebrada 🪁

> Plataforma que conecta moradores aos comércios e serviços locais da sua quebrada.

![Status](https://img.shields.io/badge/status-Finalizado-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)

🔗 **Site:** [www.feiradequebrada.com.br](https://www.feiradequebrada.com.br)

---

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Páginas do site](#páginas-do-site)
- [Tecnologias](#tecnologias)
- [Como rodar localmente](#como-rodar-localmente)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Firebase e dados](#firebase-e-dados)
- [Acessibilidade](#acessibilidade)
- [Privacidade (LGPD)](#privacidade-lgpd)
- [Próximos passos](#próximos-passos)
- [Contato](#contato)
- [Integrantes](#integrantes)
- [Licença](#licença)

---

## Sobre o projeto

A **Feira da Quebrada** dá visibilidade a pequenos empreendedores e aproxima moradores dos produtos e serviços da própria comunidade. Funciona como uma **vitrine**: divulga os negócios e o contato acontece direto pelo WhatsApp ou Instagram do empreendedor. O site **não realiza vendas nem agendamentos**.

Projeto desenvolvido pelos estudantes da turma **SP09** no curso de **Front End do Instituto Proa**, em parceria com a **Serasa Experian**, alinhado à **ODS 8 (meta 8.3)**.

---

## Funcionalidades

### Para quem procura (clientes)

- **Busca e filtros:** por nome, descrição, categoria ou bairro, com filtro por categoria e por localização.
- **Detalhes do comércio:** foto, galeria, categoria, bairro, horários, formas de pagamento, descrição e botões para WhatsApp e Instagram.
- **Favoritos:** salve os comércios de que mais gosta.
- **Mapa por região:** os negócios aparecem agrupados por bairro em círculos no mapa, com a lista de empreendedores de cada região. Com a permissão do navegador, a lista é ordenada pela distância até você.
- **Conta de cliente:** cadastro, login, edição de dados de contato e troca de senha.

### Para quem vende (empreendedores)

- **Painel do lojista**, dividido em quatro abas:
  - **Dashboard:** métricas da vitrine, como visualizações do perfil e cliques no WhatsApp.
  - **Meu Negócio:** dados do comércio, logo, galeria de fotos, horário de funcionamento, localização e avaliações dos clientes (com opção de denunciar).
  - **Minha Vitrine:** pré-visualização de como o negócio aparece para o público.
  - **Meu Perfil:** dados do responsável, troca de senha e gerenciamento da conta (incluindo ativar/pausar o perfil e excluir a conta).
- **Preenchimento de endereço por CEP**, com BrasilAPI e ViaCEP como alternativa, e **ajuste da localização** num mini mapa com pin arrastável.

### No site em geral

- **Assistente virtual "Jéssica":** chat de dúvidas frequentes (cadastro, gratuidade, bairros, dicas de segurança contra golpes). É baseado em regras, **sem uso de IA**.
- **Menu responsivo:** header fixo que escurece ao rolar a página, menu lateral no celular e dropdown de categorias.
- **Página inicial** com carrossel de destaque (com botão de pausa), vitrine de profissões, categorias populares, seção "Sobre nós", depoimentos e chamada para o mapa.

---

## Páginas do site

| Página | Arquivo | O que faz |
|---|---|---|
| Início | `index.html` | Home com busca, carrossel, categorias, sobre, depoimentos e mapa |
| Cadastro | `pages/cadastro.html` | Criação de conta como **cliente** ou **empreendedor** |
| Login | `pages/login.html` | Entrada com e-mail e senha |
| Filtro / busca | `pages/filtro.html` | Lista de comércios com busca, filtros, favoritos e modal de detalhes |
| Mapa | `pages/mapa.html` | Mapa interativo por bairro e lista lateral |
| Painel do lojista | `pages/painel.html` | Gerenciamento do comércio (dashboard, negócio, vitrine, perfil) |
| Configurações | `pages/conf-usuario.html` | Dados de contato, senha e favoritos do usuário |
| Sobre | `pages/sobre.html` | Sobre o projeto e a equipe |
| Privacidade | `pages/privacidade.html` | Política de privacidade |

---

## Tecnologias

Front-end com tecnologias web puras, sem frameworks e sem etapa de build:

- **HTML5:** marcação semântica (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **CSS3:** variáveis nativas, Grid, Flexbox, `color-mix()` e `backdrop-filter`.
- **JavaScript (Vanilla, ES Modules):** carrossel, header com efeito de scroll, filtros, painel, chat e mapas.
- **[Firebase](https://firebase.google.com/) 10.8.0** (carregado por CDN):
  - **Authentication:** cadastro, login e troca de senha.
  - **Realtime Database:** dados dos comércios, cadastros e favoritos.
- **[Leaflet](https://leafletjs.com/) 1.9.4** com mapas do **OpenStreetMap**.
- **APIs externas:** [BrasilAPI](https://brasilapi.com.br/) e [ViaCEP](https://viacep.com.br/) (consulta de CEP) e [Nominatim](https://nominatim.org/) (coordenadas a partir do endereço).
- **Acessibilidade:** [VLibras](https://vlibras.gov.br/) e [UserWay](https://userway.org/).
- **Fontes e ícones:** Google Fonts (DM Sans e Poppins) e Font Awesome.

O site é publicado com domínio próprio (arquivo `CNAME`, padrão do GitHub Pages).

---

## Como rodar localmente

Não há instalação de pacotes nem build. Como os scripts usam **ES Modules** e caminhos a partir da raiz (ex.: `/scripts/inicio.js`), é necessário abrir o projeto por um **servidor local**. Abrir o `index.html` direto pelo explorador de arquivos (`file://`) **não funciona**.

```bash
git clone https://github.com/feiradaquebrada/nosso-site.git
cd nosso-site
npx serve .
```

Depois, acesse o endereço mostrado no terminal (geralmente `http://localhost:3000`).

Também funciona com a extensão **Live Server** do VS Code ("Go Live" sobre o `index.html`), desde que a pasta aberta no editor seja a raiz do projeto.

> As funções de cadastro, login, painel, filtro e mapa dependem do Firebase e de internet. Sem conexão, só o conteúdo estático da home carrega.

---

## Estrutura de pastas

```
nosso-site/
├── index.html              # Página inicial
├── CNAME                   # Domínio personalizado
├── LICENSE
├── README.md
├── pages/                  # Demais páginas
│   ├── cadastro.html
│   ├── login.html
│   ├── filtro.html
│   ├── mapa.html
│   ├── painel.html
│   ├── conf-usuario.html
│   ├── sobre.html
│   └── privacidade.html
├── scripts/                # JavaScript (um arquivo por página/recurso)
│   ├── firebase-config.js  # Inicialização do Firebase (auth e db)
│   ├── inicio.js           # Home: carrossel, header, menus, estado de login
│   ├── cadastro.js
│   ├── login.js
│   ├── filtro.js
│   ├── mapa.js
│   ├── painel.js
│   ├── conf-usuario.js
│   ├── sobre.js            # Menu e dropdown das páginas internas
│   └── chat.js             # Assistente virtual "Jéssica"
├── styles/                 # CSS (um arquivo por página/recurso)
│   ├── styleinicio.css     # Base do site: header, home, rodapé
│   └── ...                 # login, cadastro, filtro, mapa, painel, chat etc.
├── icones/                 # Ícones das categorias e da interface
└── imagens/                # Logos, capas, fotos e ilustrações
```

---

## Firebase e dados

A configuração do Firebase fica em `scripts/firebase-config.js`, que exporta `auth` e `db` para os demais scripts.

Principais nós do **Realtime Database**:

| Caminho | Conteúdo |
|---|---|
| `cadastro/{uid}` | Dados básicos do usuário (nome, e-mail de contato, telefone) |
| `Comercio/{uid}` | Comércio do empreendedor: `dadosNegocio`, `logo`, `galeria`, `horarios`, `perfilResponsavel`, `statusConta`, `metricas` e `denuncias` |
| `favoritos/{uid}` | Comércios favoritados pelo usuário |

Observações para quem for mexer no código:

- A **configuração web do Firebase não é secreta** por natureza, mas a segurança real depende das **regras do Realtime Database** e das restrições da chave de API no console do Firebase. Revise essas regras antes de qualquer lançamento.
- A configuração está **duplicada** em `scripts/conf-usuario.js`. O ideal é importar de `firebase-config.js`, como os outros scripts fazem.
- Logo e fotos da galeria são lidos com `FileReader` e guardados como **Data URL (base64)**. Funciona para o protótipo, mas o **Firebase Storage** é o caminho recomendado para crescer.
- Entradas de formulário passam por funções de **sanitização** (`sanitizar` / `sanitizarEntrada`) antes de serem salvas ou exibidas.

---

## Acessibilidade

- Marcação semântica e hierarquia de headings consistente.
- Textos alternativos nas imagens; decorativas com `alt=""` e `aria-hidden`.
- Indicador de foco visível (`:focus-visible`).
- Suporte a `prefers-reduced-motion`.
- Carrossel com região identificada, rótulos por slide e botão de pausa/retomada.
- Menu lateral fechável com a tecla `Esc`.
- Widgets de acessibilidade: **VLibras** (tradução para Libras) e **UserWay**.

---

## Privacidade (LGPD)

A plataforma coleta os dados necessários para o cadastro e o funcionamento do serviço:

- **Clientes:** nome, e-mail, senha (gerenciada pelo Firebase Authentication) e palavra de segurança.
- **Empreendedores:** os dados acima, mais as informações do comércio (nome, categoria, descrição, bairro, endereço, contatos, horários, formas de pagamento, fotos e coordenadas).

No mapa, os negócios aparecem **agrupados por bairro, em círculos de cerca de 450 m**, e não como um pin por endereço, o que ajuda quem trabalha em casa. A geolocalização do visitante só é usada com a permissão do navegador, para centralizar o mapa e ordenar a lista por distância.

Detalhes completos na página [Política de Privacidade](pages/privacidade.html).

---

## Próximos passos

- Revisar as regras de segurança do Realtime Database e restringir a chave de API.
- Unificar a configuração do Firebase em um único arquivo.
- Migrar as imagens para o Firebase Storage.
- Testes de acessibilidade com leitores de tela reais e navegação por teclado ponta a ponta.
- Extrair trechos repetidos entre páginas (header, rodapé, menu) para evitar duplicação.

---

## Contato

Turma **SP09**: Instituto Proa × Serasa Experian.

- 📷 Instagram: [@feiradaquebrada](https://www.instagram.com/feiradaquebrada)
- ✉️ E-mail: [feiradaquebrada@gmail.com](mailto:feiradaquebrada@gmail.com)

---

## Integrantes

| Nome | Função |
|---|---|
| Adrielly Rodrigues | P.O. e Dev |
| Ana Luisa Sousa | UI Designer e Front-End |
| Brenda Souza | Pesquisa e Q.A. |
| Elias Rodrigues | Tech Lead e Dev |
| Kathlyn | Dev FullStack|
| Muryel Nascimento | Scrum Master e Dev |
| Nathalie | UX Design e Dev |

---

## Licença

Distribuído sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.