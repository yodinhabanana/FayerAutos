# Diagramas pedidos para o projeto
- Os diagramas foram feitos utilizando mermaid:

## Diagrama de classe:

- Como foi feito pelo plantuml, não tem como plotar por codificação:
![alt text](image.png)


## Diagrama de pacotes:

- Por imagem:
![alt text](image-1.png)

- Codificação:
```mermaid
flowchart LR

    subgraph FRONT["Frontend - Next.js"]

        APP["app"]

        PAGES["pages
        Home
        Login
        Register
        Cart
        Stock Management"]

        COMPONENTS["components
        home
        cart
        product
        layout
        stock-management"]

        SERVICES_F["services
        authService
        cartService
        productService
        categoryService"]

        TYPES["types
        Product
        Order
        OrderItem
        Auth
        ProductCategory"]

        UTILS_F["utils
        supabase"]

        APP -->|define rotas| PAGES

        PAGES -->|usa componentes| COMPONENTS
        PAGES -->|consome serviços| SERVICES_F
        PAGES -->|utiliza tipos| TYPES

        COMPONENTS -->|busca dados| SERVICES_F
        COMPONENTS -->|tipa propriedades| TYPES

        SERVICES_F -->|utiliza modelos| TYPES
        SERVICES_F -->|utiliza utilitários| UTILS_F

    end

    subgraph BACK["Backend - Spring Boot"]

        CONTROLLER["controller"]
        SERVICE["service"]
        REPOSITORY["repository"]
        MODEL["model"]
        DTO["dto"]
        CONFIG["config"]
        RESOURCES["resources"]

        CONTROLLER -->|recebe/retorna dados| DTO
        CONTROLLER -->|delega regras de negócio| SERVICE

        SERVICE -->|acessa persistência| REPOSITORY
        SERVICE -->|manipula entidades| MODEL
        SERVICE -->|utiliza autenticação JWT| CONFIG

        REPOSITORY -->|persiste entidades| MODEL
        REPOSITORY -->|persiste/consulta| DB

        CONFIG -->|carrega configurações| RESOURCES

    end

    DB[("Banco de Dados\nPostgreSQL")]

    SERVICES_F ==>|HTTP/REST JSON| CONTROLLER
