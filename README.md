# 🍀 api-duendindin

API do projeto Duendindin

## 💰 Começando

Estas instruções lhe darão uma cópia do projeto instalado e funcionando em
sua máquina local para fins de desenvolvimento e teste.

### 🤖 Pré-requisitos

Requisitos para o software e outras ferramentas para desenvolver e testar.
- [Node] - https://nodejs.org/en/
- [Mysql]
- [Yarn] - Rodar o comando: *npm install --global yarn* - Essa ferramenta de gerenciador de pacotes é opcional

### 🎲 Instalando e executando
```bash 
# Clonar este repositório
$ git clone https://alexandre299-admin@bitbucket.org/alexandre299/api-duendindin.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api-duendindin

# Instale as dependências
$ npm install # Ou "yarn install" caso preferir

# Copie o .env.example
$ cp .env.example .env

# Modifique o arquivo .env
APP_PORT=<Porta em que o servidor irá rodar>

DB_NAME=<Nome da base de dados>
DB_USER=<Nome de usuário Mysql>
DB_PWD=<Senha Mysql>
DB_DIALECT=mysql *Não modificar esse valor*
DB_HOST=<Host Mysql>

USER_MODEL_NAME=<Nome da tabela de usuário>
SETTING_MODEL_NAME=<Nome da tabela de configuração>
GAIN_MODEL_NAME=<Nome da tabela de ganhos>
EXPENSE_MODEL_NAME=<Nome da tabela de gastos>
CATEGORY_MODEL_NAME=<Nome da tabela de categoria>

# Subir o database
$ npm run db:create

# Subir as tabelas
$ npm run db:migrate:up

# Subir alguns dados
$ npm run db:seed:up

# ATENÇÃO: Utilizar apenas se for preciso deletar as tabelas
$ npm run db:migrate:down

# ATENÇÃO: Utilizar apenas se for preciso deletar os dados
$ npm run db:seed:down

# Executar o servidor
$ npm start
```

## 👥 Autores

  - **Alexandre Araujo**
  - **Vinicius Fausto**