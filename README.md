# 🌍 Global Atlas

**Global Atlas** é um dashboard interativo de exploração de países que reúne informações de diferentes fontes em uma única interface.

O projeto foi desenvolvido para praticar principalmente **consumo e integração de APIs, JavaScript, Node.js, organização de dados e desenvolvimento de uma API própria**, utilizando um backend para consultar múltiplos serviços externos e entregar os dados já organizados ao frontend.

[Global Atlas](https://api-paises-beta.vercel.app/)

## ✨ Funcionalidades

Ao pesquisar um país, o Global Atlas reúne informações de diferentes categorias:

* 🌎 Informações gerais do país
* 🏳️ Bandeira, capital, população, moeda e idiomas
* 🗺️ Área, continente e código telefônico
* 🌤️ Clima atual da capital
* 📅 Previsão do tempo para os próximos dias
* 📍 Localização da capital e coordenadas
* 💰 Indicadores econômicos
* 💱 Taxas de câmbio
* 📈 Gráfico de evolução das moedas
* 📊 Indicadores sociais e de desenvolvimento
* 🎉 Próximos feriados nacionais
* 🗺️ Países vizinhos
* 📰 Notícias relacionadas ao país
* 🖼️ Galeria de imagens

## 🖥️ Interface

A aplicação possui uma tela inicial para pesquisa e, após a consulta, apresenta as informações em um dashboard dividido em diferentes painéis.

O conteúdo da página é preenchido dinamicamente com JavaScript a partir dos dados recebidos pelo backend.

## 🏗️ Arquitetura

Uma das principais ideias do projeto é evitar que o frontend precise lidar diretamente com todas as APIs externas.

O fluxo funciona aproximadamente assim:

```text
Usuário
   │
   ▼
Frontend
HTML + CSS + JavaScript
   │
   │ GET /api/countryData?country=...
   ▼
Backend
Vercel Functions
   │
   ├── REST Countries
   ├── Open-Meteo
   ├── Frankfurter
   ├── World Bank
   ├── UNDP
   ├── Nager Holidays
   ├── NewsAPI
   └── Unsplash
   │
   ▼
Dados organizados pelo backend
   │
   ▼
Frontend
   │
   ▼
Dashboard do país
```

O backend funciona como uma camada intermediária entre o frontend e os serviços externos, realizando as requisições e agrupando os resultados em uma única resposta.

## 🔌 APIs utilizadas

| API                                          | Utilização                                                                                      |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [REST Countries](https://restcountries.com/) | Informações gerais, bandeira, capital, população, moeda, idiomas, coordenadas e países vizinhos |
| [Open-Meteo](https://open-meteo.com/)        | Clima atual e previsão                                                                          |
| [Frankfurter](https://www.frankfurter.app/)  | Taxas de câmbio                                                                                 |
| [World Bank](https://data.worldbank.org/)    | Indicadores econômicos e sociais                                                                |
| [UNDP](https://hdr.undp.org/)                | Índice de Desenvolvimento Humano (HDI)                                                          |
| [Nager.Date](https://date.nager.at/)         | Feriados nacionais                                                                              |
| [NewsAPI](https://newsapi.org/)              | Notícias relacionadas ao país                                                                   |
| [Unsplash](https://unsplash.com/developers)  | Imagens para a galeria                                                                          |

## 🧩 Estrutura do projeto

```text
Global-Atlas/
│
├── api/
│   └── countryData.js
│
├── services/
│   └── apis.js
│
├── index.html
├── main.js
├── render.js
├── style.css
├── package.json
└── README.md
```

### `main.js`

Responsável principalmente pelo fluxo da interface:

* captura da pesquisa;
* envio da requisição para o backend;
* controle da tela de carregamento;
* tratamento inicial de erros;
* envio dos dados recebidos para as funções de renderização.

### `render.js`

Responsável por transformar os dados recebidos em conteúdo visual.

As funções são separadas por seção, como:

```js
countryHeader()
statRow()
weather()
map()
economy()
society()
holidays()
neighbors()
news()
gallery()
```

Essa separação ajuda a manter a lógica de renderização organizada.

### `api/countryData.js`

É o principal ponto de entrada do backend.

Ele:

1. recebe o país pesquisado;
2. consulta o REST Countries;
3. extrai os dados necessários;
4. utiliza essas informações para consultar outras APIs;
5. executa diversas requisições em paralelo com `Promise.all()`;
6. organiza os resultados;
7. retorna uma única resposta para o frontend.

### `services/apis.js`

Concentra as funções responsáveis pelas requisições às APIs externas.

Cada serviço possui uma função própria, por exemplo:

```js
restCountry()
openMeteo()
worldBank()
frankfurter()
nagerHolidays()
neighbors()
newsApi()
unsplash()
undp()
```

Também existe uma função genérica de requisição:

```js
request()
```

que centraliza parte do tratamento das respostas HTTP e dos erros.

## ⚡ Uso de `Promise.all()`

Como o dashboard depende de diversas APIs, várias requisições são executadas paralelamente em vez de serem feitas uma por uma.

Exemplo simplificado:

```js
const [
  openMeteo,
  frankfurter,
  worldBank,
  undp,
  nagerHolidays,
  neighbors,
  newsApi,
  unsplash
] = await Promise.all([
  api.openMeteo(...),
  api.frankfurter(...),
  api.worldBank(...),
  api.undp(...),
  api.nagerHolidays(...),
  api.neighbors(...),
  api.newsApi(...),
  api.unsplash(...)
]);
```

Isso permite que o backend aguarde várias fontes simultaneamente, reduzindo o tempo total de carregamento em comparação com uma sequência de requisições independentes.

## 🔐 Variáveis de ambiente

Algumas APIs utilizadas pelo projeto exigem chaves de acesso.

Essas chaves não devem ser inseridas diretamente no código ou no frontend.

O projeto utiliza variáveis de ambiente, como:

```env
API_KEY_RESTCOUNTRIES=
API_KEY_NEWSAPI=
API_KEY_UNSPLASH=
API_KEY_UNDP=
```

No ambiente de desenvolvimento, elas devem ser configuradas no arquivo `.env`.

> Nunca publique suas chaves reais no GitHub.

## 🚀 Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/global-atlas.git
```

### 2. Entre na pasta

```bash
cd global-atlas
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` e adicione as chaves necessárias:

```env
API_KEY_RESTCOUNTRIES=sua_chave
API_KEY_NEWSAPI=sua_chave
API_KEY_UNSPLASH=sua_chave
API_KEY_UNDP=sua_chave
```

### 5. Execute o projeto

Caso esteja utilizando a Vercel CLI:

```bash
vercel dev
```

Depois, acesse a URL local fornecida pelo comando.

## 🛠️ Tecnologias

**Frontend**

* HTML5
* CSS3
* JavaScript
* ES Modules
* Fetch API
* Chart.js

**Backend**

* Vercel Functions
* APIs REST
* `Promise.all()`
* Variáveis de ambiente

## 📚 Conceitos praticados

Este projeto foi construído principalmente como projeto de estudo e prática.

Entre os principais conceitos trabalhados estão:

* Consumo de APIs REST
* Requisições HTTP
* `async/await`
* Promises
* `Promise.all()`
* Manipulação de respostas JSON
* Query parameters
* Variáveis de ambiente
* Separação entre frontend e backend
* Organização de funções por responsabilidade
* Tratamento de erros
* Manipulação do DOM
* Renderização dinâmica
* Criação de gráficos com Chart.js
* Formatação de datas e números
* Integração de múltiplos serviços externos

## 🎯 Objetivo do projeto

O principal objetivo do Global Atlas não é apenas exibir informações sobre países, mas servir como um exercício prático de integração entre diferentes serviços.

Ao pesquisar um único país, o sistema precisa:

```text
1. Encontrar o país
2. Obter seus dados básicos
3. Usar esses dados para descobrir coordenadas,
   moeda, códigos e países vizinhos
4. Consultar diferentes APIs
5. Combinar os resultados
6. Entregar uma resposta única
7. Transformar os dados em uma interface visual
```

Dessa forma, o projeto explora uma situação próxima da encontrada em aplicações reais: **um sistema consumindo e organizando informações provenientes de diferentes serviços externos**.

## 🔮 Possíveis melhorias futuras

Algumas melhorias que podem ser implementadas posteriormente:

* Melhor tratamento de falhas individuais das APIs
* Cache de resultados
* Melhor sistema de loading e feedback de erros
* Paginação ou filtros para notícias
* Histórico de países pesquisados
* Responsividade aprimorada
* Mais informações culturais e geográficas
* Testes automatizados
* Validação mais robusta dos dados recebidos
* Melhor separação dos dados econômicos e sociais no backend

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.
