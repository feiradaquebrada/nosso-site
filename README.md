# Feira da Quebrada 🪁

> Plataforma que conecta moradores aos comércios e serviços locais da sua quebrada.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

🔗 **Site:** [www.feiradequebrada.com.br](https://www.feiradequebrada.com.br)

---

## Sobre o projeto

A **Feira da Quebrada** dá visibilidade a pequenos empreendedores e aproxima moradores dos produtos e serviços da própria comunidade. Funciona como uma **vitrine**: divulga os negócios e o contato acontece direto pelas redes sociais do empreendedor. O site não realiza vendas nem agendamentos.

**Principais recursos**

- Busca por nome do comércio, serviço ou produto
- Filtros por região e categoria
- Perfil do empreendedor com serviços e redes sociais
- Mapa por região, sem expor o endereço exato (privacidade para quem trabalha em casa)

Projeto desenvolvido pelos estudantes da turma **SP09** no curso de **Front End do Instituto Proa**, em parceria com a **Serasa Experian**, alinhado à **ODS 8 (meta 8.3)**.

Este repositório contém a **página inicial**: header com busca e autenticação, carrossel de destaque, vitrine de profissionais, categorias populares, seção institucional e espaço reservado para o futuro mapa interativo. Novas páginas e funcionalidades serão adicionadas conforme o projeto avança.

---

## Tecnologias

Front-end com tecnologias web puras, sem frameworks:

- **HTML5**: marcação semântica (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3**: variáveis nativas, Grid, Flexbox e aninhamento nativo
- **JavaScript (Vanilla)**: carrossel do hero e comportamento do header
- **Firebase**: backend previsto para cadastro e dados dos empreendedores

---

## Como rodar localmente

Não há build nem instalação de pacotes.

```bash
git clone https://github.com/feiradaquebrada/nosso-site.git
cd nosso-site
```

Abra o `inicio.html` no navegador ou, de preferência, use um servidor local:

```bash
npx serve .
```

Também funciona com a extensão **Live Server** do VS Code ("Go Live" sobre o `inicio.html`).

### Estrutura de pastas

```
nosso-site/
├── inicio.html
├── styles/
│   └── styleinicio.css
├── inicio.js
├── logo.png
├── icones/
└── imagens/
```

---

## Acessibilidade

- Marcação semântica e hierarquia de headings consistente
- Textos alternativos nas imagens; decorativas com `alt=""` e `aria-hidden`
- Indicador de foco visível (`:focus-visible`)
- Suporte a `prefers-reduced-motion`
- Carrossel com região identificada, rótulos por slide e botão de pausa/retomada

Próximo passo: testes com leitores de tela reais e navegação por teclado ponta a ponta.

---

## Privacidade (LGPD)

Coletamos apenas os dados essenciais para cadastro e funcionamento da plataforma, e o mapa mostra só a região do negócio.

---

## Contato

Turma **SP09**: Instituto Proa × Serasa Experian.

- 📷 Instagram: [@feiradaquebrada](https://www.instagram.com/feiradaquebrada)
- ✉️ E-mail: [feiradaquebrada@gmail.com](mailto:feiradaquebrada@gmail.com)

## Integrantes

- Adrielly Rodrigues (P.O. & Dev)
- Ana Luisa Sousa ( UI Designer e Front-End)
- Brenda Souza (Pesquisa e Q.A)
- Elias Rodrigues (Tech Lead e Dev)
- Kathlyn (Dev)
- Muryel Nascimento (Scrum M. e Dev)
- Nathalie (UX Design e Dev)