# FayerAutos

Status do Projeto: Em Desenvolvimento (Fase de Prototipagem)
-> O FayerAutos é uma plataforma de e-commerce (varejo virtual) especializada no comércio de autopeças. O projeto abrange desde a concepção do protótipo até as fases de desenvolvimento, testes, homologação e manutenção do sistema.

## Por que estamos desenvolvendo?
-> A ideia do projeto é que os usuários (clientes ou administradores) tenham acesso a um site de venda de autopeças, no qual os administradores poderão alterar preços, quantidade em estoque, etc e os clientes poderão
comprar de maneira autenticada os itens disponíveis por meio de um site responsivo e seguro, oferecendo uma plataforma centralizada para venda e gerenciamento de produtos.

## DevOps:
Sistema feito usando trello para gerenciar a sprint com os seguintes cargos aos membros:
Mariana Pereira Lucas(Scrum Master + Developer)
Karyna Morais Lins (Developer + Designer)
Patrick Jose Fernantes (Developer + Tester) 

## Tecnologias e Ferramentas
O ecossistema do projeto é dividido em uma arquitetura robusta e moderna:

### Infraestrutura
- Banco de Dados: Supabase (PostgreSQL)
- Front-end: React.js
- Back-end: Spring Boot (Java)
- Ambiente de Execução Front-end: Node.js
- Controle de Versão: Git e GitHub
- Comunicação: API REST via HTTPS

- Acesso ao trello: https://trello.com/b/rZLcI98q/mapa-para-desenvolvimento-do-trabalho-de-engenharia-de-software

- O acesso ao banco de dados pode ser feito via: https://supabase.com/dashboard/project/sajxqpcexotzocoivrgq

OBS: Apenas o professor terá acesso, além dos membros do grupo

### Ferramentas adicionais/de suporte:
Trello: gerenciamento de backlog, sprints e tarefas.
Git/Github: Versionamento

## Escopo do Projeto & Funcionalidades
1. Autenticação e Segurança
Sistema de Cadastro: Registro de novos usuários na plataforma.
Autenticação Segura: Login baseado em credenciais de acesso (username/email e password).

2. Experiência de Compra (E-commerce)
Barra de Pesquisa: Sistema de busca otimizado para localização rápida de peças e componentes.
Carrinho de Compras: Fluxo dinâmico de adição, remoção e gerenciamento de itens antes do checkout.

3. Gestão e Retaguarda (Backoffice)
Controle de Estoque: Sistema integrado diretamente ao Back-end para atualização em tempo real de mercadorias, entradas e saídas.

## Autenticação e Segurança
- Cadastro de usuários.
- Login por e-mail e senha.
- Criptografia de senhas utilizando BCrypt.
- Controle de acesso por autenticação de usuário.

## Ciclo de Desenvolvimento (Do Ciclo de Vida do Software)
- Para garantir a qualidade da entrega, o projeto segue as seguintes etapas:
- Prototipagem: Design de interface e arquitetura inicial do sistema.
- Desenvolvimento: Codificação do Front-end (React) e regras de negócio/APIs (Java).
- Testes & Homologação: Validação de segurança, fluxos de compra e validação de estoque com o usuário final.
- Manutenção: Planejamento de correções de bugs e melhorias contínuas.

## Como Executar o Projeto (Breve)
Nota: Esta seção será atualizada com os comandos exatos assim que a estrutura de pastas for consolidada.
Pré-requisitos
Java JDK (versão 21 ou superior recomendada)
Node.js & NPM/Yarn

-- Para iniciar backend: 
> cd backend -> 

## Arquitetura de Telas (Front-end)
A aplicação React será estruturada com as seguintes visualizações:

*   **Área Pública:** `Home`, `Catálogo/Busca`, `Detalhes do Produto` e `Carrinho`.
*   **Área do Cliente (Autenticada):** `Login`, `Cadastro` e `Painel do Usuário / Checkout`.
*   **Área Administrativa (Gestão):** `Controle de Estoque` e `Cadastro/Edição de Peças`.
