# Padrões de Uso do Git

## Objetivo

Definir regras para utilização do Git durante o desenvolvimento do projeto, facilitando o trabalho colaborativo, a organização do código e a documentação.

---

## Estrutura do Projeto

### Código-fonte

Todo o código da aplicação deve ficar dentro da pasta:

```text
/src
```

### Documentação

Toda documentação do projeto deve ficar dentro da pasta:

```text
/docs
```

Exemplos:

- Diagramas UML
- Casos de uso
- Relatórios
- Manuais

---

## Padrão de Branches

Utilizar as seguintes branches:

- `main` → versão estável do projeto
- `development` → integração das funcionalidades em desenvolvimento
- `feature/nome-funcionalidade` → desenvolvimento de novas funcionalidades
- `fix/nome-correcao` → correções de bugs

### Exemplos

```bash
feature/login
feature/carrinho-compras
fix/erro-cadastro
```

---

## Padrão de Commits

As mensagens de commit devem seguir o padrão Conventional Commits.

### Tipos de Commit

| Tipo     | Descrição                             |
| -------- | ------------------------------------- |
| feat     | Nova funcionalidade                   |
| fix      | Correção de erro                      |
| docs     | Alteração na documentação             |
| style    | Formatação de código                  |
| refactor | Refatoração sem alterar comportamento |
| test     | Criação ou alteração de testes        |
| chore    | Configurações e tarefas auxiliares    |

### Exemplos

```bash
git commit -m "feat: criar tela de login"
```

```bash
git commit -m "fix: corrigir validação de senha"
```

```bash
git commit -m "docs: atualizar diagrama UML"
```

```bash
git commit -m "refactor: melhorar organização dos serviços"
```

---

## Fluxo de Trabalho

1. Atualizar a branch development.
2. Criar uma branch feature ou fix.
3. Desenvolver a funcionalidade.
4. Realizar commits seguindo o padrão definido.
5. Abrir Pull Request para a branch development.
6. Após revisão, realizar merge.

---

## Arquivo .gitignore

O projeto utilizará um arquivo `.gitignore` para impedir o versionamento de arquivos temporários e dependências.

### Exemplo

```gitignore
# Dependências
node_modules/

# Build
dist/
build/

# Arquivos de ambiente
.env

# Logs
*.log

# IDEs
.vscode/
.idea/
```

---

## Considerações Finais

Todos os integrantes devem seguir os padrões definidos neste documento para manter a organização, rastreabilidade das alterações e facilitar a manutenção do projeto.

ai o que o gpt fez, é um .md ai coloca dentro de padrões adotadors
