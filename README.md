<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Uma Aplicação <a href="http://nodejs.org" target="_blank">Node.js</a> template desenvolvida para uso com bancos relacionais e Inteligência artificial</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Utilizamos o [Nest](https://github.com/nestjs/nest) framework TypeScript para o desenvolvimento de um tempĺate para serviço API com integração ao Postegres e ao ChatGPT. 
 <ul>
   <li>A autenticação pode ser configurada internamente ou integrada à outras ferramentas, como Keycloak.</li>
   <li>Pode-se configurar mais de um database</li>
   <li>O provisionamento do banco é feito via terraform assim como o provisioamento do GIT. Caso não queira executar o terraform, utilise o SQL. No arquivo database.tf encontra-se todas as tabelas em SQL.</li>
   <li>Os testes são configurados com JEST</li>
 </ul>



## Instalação

```bash
$ npm install
```
## Provisionando Banco na AWS

```bash
$ terraform plan
```
```bash
$ terraform apply
```
## Executando a aplicação
<ul>
   <li>Antes de executar certifique-se de criar um arquivo env na raiz do projeto</li></ul>

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Estrutura
```
/project-root
│
├── /node_modules
├── /src
│   ├── /config
│   │
│   ├── /database
│   │   └── database.module.ts # Singleton: Gerencia conexão com o bancos de dados
│   │
│   ├── /modules  
│   │   ├── /control           #Exemplo de modulo adicional
│   │   │   ├── control.controller.ts     # Controlador 
│   │   │   ├── control.service.ts        # Service
│   │   │   └── control.module.ts         # Módulo 
│   │   │
│   │   ├── /press
│   │   │   ├── noticia-original.controller.ts
│   │   │   ├── noticia-original.module.ts
│   │   │   ├── noticia-original.service.ts
│   │   │   ├── noticias.controller.ts
│   │   │   ├── noticias.module.ts
│   │   │   └── noticias.service.ts
│   │   └──...
│   │
│   ├── /common
│   │   ├── decorators
│   │   │   └── logging.decorator.ts      # Decorator: Adiciona logging
│   │   │
│   │   └── filters
│   │       └── http-exception.filter.ts  # Filtro para tratamento de exceções HTTP
│   │
│   ├── /shared
│   │   ├── /models
│   │   │   ├── user.entity.ts            # Entidade de Usuário
│   │   │   ├── control-entity.ts         # Entidade do banco "controle"
│   │   │   └── press-entity.ts           # Entidade do banco "imprensa"
│   │
│   ├── app.module.ts                     # Módulo raiz da aplicação
│   └── main.ts                           # Ponto de entrada da aplicação
│   ├── /test
│       ├── /modules
│       │   ├── /press
│       │   │   ├── noticia-original.controller.spec.ts
│       │   │   ├── noticia-original.service.spec.ts
│       │   │   ├── noticias.controller.spec.ts
│       │   │   └── noticias.service.spec.ts
│       │   └── ...
├── /dist                                 # Código transpilado (output)
├── tsconfig.json                         # Configurações do TypeScript
├── /terraform                            # IoC provisionamento Estrutura
│       ├── ci-cd.tf                      # Repositorio e deploy
│       ├── database.tf                   # Banco de dados
│       └── ...                 
├── package.json                          # Dependências e scripts do projeto
├── dockerfile                            # configuração do docker
├── .env                                  # Variáveis de ambiente
├── .eslintrc.js                          # padrão de código
├── project-structure                     # Estrutura de diretário e arquivos do projeto
└── README.md                             # Documentação do projeto
```
## Licença

Nest is [MIT licensed](LICENSE).
