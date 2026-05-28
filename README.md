# FayerAutos

Status do Projeto: Em Desenvolvimento (Fase de Prototipagem)
O FayerAutos é uma plataforma de e-commerce (varejo virtual) especializada no comércio de autopeças. O projeto abrange desde a concepção do protótipo até as fases de desenvolvimento, testes, homologação e manutenção do sistema.

## DevOps:
Sistema feito usando trello para gerenciar a sprint com os seguintes cargos aos membros:
Mariana Pereira Lucas(Scrum Master + Developer)
Karyna Morais Lins (Developer + Designer)
Patrick Jose Fernantes (Developer + Tester) 

## Tecnologias e Ferramentas
O ecossistema do projeto é dividido em uma arquitetura robusta e moderna:
Front-end: React.js
Back-end & APIs: Java
Ambiente de Execução: Node.js (Suporte ao ecossistema Front-end)
HTTPS

## Escopo do Projeto & Funcionalidades
1. Autenticação e Segurança
Sistema de Cadastro: Registro de novos usuários na plataforma.
Autenticação Segura: Login baseado em credenciais de acesso (username/email e password).

2. Experiência de Compra (E-commerce)
Barra de Pesquisa: Sistema de busca otimizado para localização rápida de peças e componentes.
Carrinho de Compras: Fluxo dinâmico de adição, remoção e gerenciamento de itens antes do checkout.

3. Gestão e Retaguarda (Backoffice)
Controle de Estoque: Sistema integrado diretamente ao Back-end para atualização em tempo real de mercadorias, entradas e saídas.

## Ciclo de Desenvolvimento (Do Ciclo de Vida do Software)
- Para garantir a qualidade da entrega, o projeto segue as seguintes etapas rigorosas:
- Prototipagem: Design de interface e arquitetura inicial do sistema.
- Desenvolvimento: Codificação do Front-end (React) e regras de negócio/APIs (Java).
- Testes & Homologação: Validação de segurança, fluxos de compra e validação de estoque com o usuário final.
- Manutenção: Planejamento de correções de bugs e melhorias contínuas.

## Como Executar o Projeto (Breve)
Nota: Esta seção será atualizada com os comandos exatos assim que a estrutura de pastas for consolidada.
Pré-requisitos
Java JDK (versão 17 ou superior recomendada)
Node.js & NPM/Yarn

2. Fluxo de Autenticação (Acesso Seguro)
Página de Login:

## Arquitetura de Telas (Front-end)

A aplicação React será estruturada com as seguintes visualizações:

*   **Área Pública:** `Home`, `Catálogo/Busca`, `Detalhes do Produto` e `Carrinho`.
*   **Área do Cliente (Autenticada):** `Login`, `Cadastro` e `Painel do Usuário / Checkout`.
*   **Área Administrativa (Gestão):** `Controle de Estoque` e `Cadastro/Edição de Peças`.
