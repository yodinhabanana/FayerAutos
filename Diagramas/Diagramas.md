# Diagramas pedidos para o projeto
- Os diagramas foram feitos utilizando plantuml e mermaid:

## Diagrama de classe:

- Por imagem:
![alt text](image.png)

- Codificação
```plantuml
@startuml
hide circle
skinparam classAttributeIconSize 0

class UserRole {
  - id: int
  - roleName: String
  - description: String
}

class UserAccount {
  - id: int
  - fullName: String
  - birthDate: String
  - email: String
  - document: String
  - gender: String
  - username: String
  - passwordHash: String
}

class Contact {
  - id: int
  - telephone: String
}

class Address {
  - id: int
  - street: String
  - number: String
  - neighborhood: String
  - city: String
  - state: String
  - complement: String
  - zipCode: String
}

class ProductCategory {
  - id: int
  - categoryName: String
  - description: String
}

class Product {
  - id: int
  - productName: String
  - brand: String
  - sku: String
  - description: String
  - price: Double
  - stockQuantity: int
}

class Order {
  - id: int
  - orderCode: String
  - status: String
}

class OrderItem {
  - id: int
  - quantity: int
  - unitPrice: Double
}

' Relacionamentos
UserRole "1" -- "0..*" UserAccount : define o papel >
UserAccount "1" -- "0..*" Contact : possui >
UserAccount "1" -- "0..*" Address : possui >

UserAccount "1" -- "0..*" Order : realiza >
Address "1" -- "0..*" Order : local de entrega >

ProductCategory "1" -- "0..*" Product : agrupa >

Order "1" *-- "1..*" OrderItem : contem >
Product "1" -- "0..*" OrderItem : compoe >

@enduml
```

## Diagrama de pacotes:

- Por imagem:
![alt text](image-1.png)

- Codificação:
```mermaid
flowchart LR

    subgraph SISTEMA["Sistema"]

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

            APP -.->|"define rotas"| PAGES

            PAGES -.->|"utiliza componentes"| COMPONENTS
            PAGES -.->|"consome serviços"| SERVICES_F
            PAGES -.->|"utiliza tipos"| TYPES

            COMPONENTS -.->|"chama lógica"| SERVICES_F
            COMPONENTS -.->|"aplica tipos"| TYPES

            SERVICES_F -.->|"formata requisições"| TYPES
            SERVICES_F -.->|"utiliza utilitários"| UTILS_F
        end

        subgraph BACK["Backend - Spring Boot"]

            CONTROLLER["controller
            AuthController
            ProductController
            ProductCategoryController
            OrderItemController"]

            SERVICE["service
            AuthService
            CartService
            ProductService
            ProductCategoryService
            JwtService"]

            REPOSITORY["repository
            ProductRepository
            ProductCategoryRepository
            OrderItemRepository
            UserRepository"]

            MODEL["model
            Product
            ProductCategory
            Order
            OrderItem
            UserAccount
            Address
            Contact"]

            DTO["dto
            LoginRequest
            LoginResponse
            RegisterRequest
            ProductCreateRequest
            ProductUpdateRequest
            AddToCartRequest"]

            CONFIG["config
            SecurityConfig
            SecurityBeans"]

            RESOURCES["resources
            application.properties"]

            CONTROLLER -.->|"chama regras de negócio"| SERVICE
            CONTROLLER -.->|"valida entrada / formata"| DTO

            SERVICE -.->|"acessa dados"| REPOSITORY
            SERVICE -.->|"manipula entidades"| MODEL
            SERVICE -.->|"usa configurações"| CONFIG

            REPOSITORY -.->|"mapeia entidades"| MODEL
            CONFIG -.->|"lê propriedades"| RESOURCES
        end
        
        DB[("Banco de Dados\nPostgreSQL")]

        SERVICES_F ==>|"HTTP/REST\nJSON"| CONTROLLER

        REPOSITORY -.->|"persiste / consulta"| DB
    end
```

## Diagramas de sequencia:

### Criar Produto
- Por imagem:
![alt text](DS_criar_produto.png)

- Codificação:

``` plantuml
@startuml
autonumber
skinparam responseMessageBelowArrow true

actor "Administrador" as Admin

box "Frontend React" #LightBlue
    participant "ProductCreatePage" as Page
    participant "ProductForm" as Form
    participant "productService (FE)" as FE_Service
end box

box "Backend Spring Boot" #LightGreen
    participant "ProductController" as Controller
    participant "ProductService (BE)" as BE_Service
    participant "ProductRepository" as Repo
end box

database "Banco de Dados" as DB

Admin -> Page : Acessa tela de cadastro
activate Page
Page -> Form : Renderiza formulário vazio
activate Form

Admin -> Form : Preenche os dados e clica em "Salvar"
Form -> Form : Valida campos obrigatórios na UI

Form -> FE_Service : createProduct(formData)
activate FE_Service

FE_Service -> Controller : POST /api/products/create-new-product (ProductCreateRequest)
activate Controller

Controller -> BE_Service : create(request)
activate BE_Service

BE_Service -> BE_Service : Instancia Product e define setters\n(setProductName, setPrice, setActive...)

BE_Service -> Repo : save(product)
activate Repo
Repo -> DB : INSERT INTO products (...)
activate DB
DB --> Repo : Confirmação (ID gerado)
deactivate DB
Repo --> BE_Service : product
deactivate Repo

BE_Service --> Controller : product
deactivate BE_Service

Controller --> FE_Service : HTTP 201 Created (Product JSON)
deactivate Controller

FE_Service --> Form : produto cadastrado
deactivate FE_Service

Form --> Page : exibe mensagem de sucesso
deactivate Form

Page --> Admin : Redirecionar para listagem (I_PainelDoLojista)
deactivate Page
@enduml
```

### Alterar Produto
- Por imagem:
![alt text](DS_editar_produtos.png)

- Codificação:

``` plantuml
@startuml
autonumber
skinparam responseMessageBelowArrow true

actor "Administrador" as Admin

box "Frontend React (Next.js)" #LightBlue
    participant "EditProductModal" as Modal
    participant "fetch (Categorias)" as FE_Fetch
end box

box "Backend Spring Boot" #LightGreen
    participant "ProductController" as Controller
    participant "ProductService (BE)" as BE_Service
    participant "ProductRepository" as Repo
end box

database "Banco de Dados" as DB

== Abertura da Modal e Carga de Dados Inicial ==

Admin -> Modal : Abre a modal de edição (isOpen = true)
activate Modal

Modal -> Modal : Inicializa estados (name, price, brand, imageUrl...)
Modal -> FE_Fetch : fetch("http://localhost:8080/api/categories")
activate FE_Fetch
FE_Fetch --> Modal : HTTP 200 OK (categoriesList JSON)
deactivate FE_Fetch

== Alteração dos Dados e Envio do Formulário ==

Admin -> Modal : Modifica os campos (ex: nome, preço) e clica em "Salvar alterações"
Modal -> Modal : handleSave() -> Converte tipos (Number(price))

Modal -> Controller : PUT /api/products/{id} (ProductUpdateRequest Body)
activate Controller

Controller -> BE_Service : update(id, request)
activate BE_Service

BE_Service -> Repo : findById(id)
activate Repo
Repo -> DB : SELECT * FROM products WHERE id = id
activate DB
DB --> Repo : dados do produto
deactivate DB
Repo --> BE_Service : Optional<Product>
deactivate Repo

BE_Service -> BE_Service : product.setProductName(), setPrice(), ...

BE_Service -> Repo : save(product)
activate Repo
Repo -> DB : UPDATE products SET ... WHERE id = id
activate DB
DB --> Repo : registro persistido no banco
deactivate DB
Repo --> BE_Service : product
deactivate Repo

BE_Service --> Controller : product
deactivate BE_Service

Controller --> Modal : HTTP 200 OK (Product JSON)
deactivate Controller

Modal -> Modal : onUpdate(updatedData) aciona recarga da lista pai
Modal --> Admin : Exibe confirmação na tela e fecha a modal
deactivate Modal
@enduml
```

### Consultar Produtos do Catálogo
- Por imagem:
![alt text](DS_consultar_produtos.png)

- Codificação:
``` plantuml
@startuml
autonumber
skinparam responseMessageBelowArrow true

actor "Administrador" as Admin

box "Frontend React" #LightBlue
    participant "ProductListPage" as Page
    participant "ProductTable" as Table
    participant "productService (FE)" as FE_Service
end box

box "Backend Spring Boot" #LightGreen
    participant "ProductController" as Controller
    participant "ProductService (BE)" as BE_Service
    participant "ProductRepository" as Repo
end box

database "Banco de Dados" as DB

Admin -> Page : Acessa o Painel do Lojista
activate Page

Page -> FE_Service : getActiveProducts()
activate FE_Service

FE_Service -> Controller : GET /api/products
activate Controller

Controller -> BE_Service : getActiveProducts()
activate BE_Service

BE_Service -> Repo : findActiveProducts()
activate Repo
Repo -> DB : SELECT * FROM products WHERE active = true
activate DB
DB --> Repo : List<Product>
deactivate DB
Repo --> BE_Service : List<Product>
deactivate Repo

BE_Service --> Controller : List<Product>
deactivate BE_Service

Controller --> FE_Service : HTTP 200 OK (List<Product> JSON)
deactivate Controller

FE_Service --> Page : array de produtos ativos
deactivate FE_Service

Page -> Table : Renderiza linhas e monta os KPIs na tela
activate Table
Table --> Admin : Exibe listagem do inventário atualizado
deactivate Table
deactivate Page
@enduml
```

### Excluir Produto
- Por imagem:
![alt text](DS_excluir_produto.png)

- Codificação:
``` plantuml
@startuml
autonumber
skinparam responseMessageBelowArrow true

actor "Administrador" as Admin

box "Frontend React (Next.js)" #LightBlue
    participant "StockManagementPage" as Page
end box

box "Backend Spring Boot" #LightGreen
    participant "ProductController" as Controller
    participant "ProductService (BE)" as BE_Service
    participant "ProductRepository" as Repo
end box

database "Banco de Dados" as DB

Admin -> Page : Clica no ícone de lixeira na linha do produto
activate Page

Page -> Page : confirm("Deseja realmente ocultar/deletar este produto?")

Page -> Controller : PUT /api/products/deleteLogic/{id}
activate Controller

Controller -> BE_Service : deleteLogic(id)
activate BE_Service

BE_Service -> Repo : findById(id)
activate Repo
Repo -> DB : SELECT * FROM products WHERE id = id
activate DB
DB --> Repo : dados do produto
deactivate DB
Repo --> BE_Service : Optional<Product>
deactivate Repo

BE_Service -> BE_Service : Altera o estado internamente\n(product.setActive(false))

BE_Service -> Repo : save(product)
activate Repo
Repo -> DB : UPDATE products SET active = false WHERE id = id
activate DB
DB --> Repo : produto inativado no banco
deactivate DB
Repo --> BE_Service : product
deactivate Repo

BE_Service --> Controller : product
deactivate BE_Service

Controller --> Page : HTTP 200 OK (Product JSON)
deactivate Controller

Page -> Page : alert("Produto deletado com sucesso!")
Page -> Page : setProducts(prev => prev.filter(p => p.id !== id))

Page --> Admin : Atualiza o grid da tela e recalcula as métricas
deactivate Page
@enduml
```

### Finalizar Pedido
- Por imagem:
![alt text](DS_finalizar_pedido.png)

- Codificação:
``` plantuml
@startuml
autonumber
skinparam responseMessageBelowArrow true

actor "Cliente" as Cliente

box "Frontend React" #LightBlue
    participant "I_FinalizarPedido" as View
    participant "orderService (FE)" as FE_Service
end box

box "Backend Spring Boot" #LightGreen
    participant "OrderController" as Controller
    participant "OrderService (BE)" as BE_Service
    participant "OrderRepository" as Repo
    participant "ProductRepository" as ProdRepo
end box

database "Banco de Dados" as DB

Cliente -> View : Selecionar logística, pagamento e clicar em "Finalizar"
activate View

View -> FE_Service : checkout(cartData)
activate FE_Service

FE_Service -> Controller : POST /api/orders (OrderCreateRequest)
activate Controller

Controller -> BE_Service : createOrder(request)
activate BE_Service

note over BE_Service, DB : Início da Transação Atômica (@Transactional)

BE_Service -> ProdRepo : findById(productId)
activate ProdRepo
ProdRepo -> DB : SELECT stock_quantity FROM products...
activate DB
DB --> ProdRepo : saldo
deactivate DB
ProdRepo --> BE_Service : Product
deactivate ProdRepo

BE_Service -> BE_Service : verificarEstoqueSuficiente()

BE_Service -> Repo : save(order)
activate Repo
Repo -> DB : INSERT INTO orders (customer_id, status)
activate DB
DB --> Repo : Order persistido (ID)
deactivate DB
Repo --> BE_Service : order
deactivate Repo

BE_Service -> Repo : saveOrderItems(items)
activate Repo
Repo -> DB : INSERT INTO order_items (order_id, product_id, quantity)
activate DB
DB --> Repo : Itens persistidos
deactivate DB
Repo --> BE_Service : sucesso
deactivate Repo

BE_Service -> ProdRepo : save(updatedProduct)
activate ProdRepo
Repo -> DB : UPDATE products SET stock_quantity = stock_quantity - Qtd
activate DB
DB --> Repo : Estoque atualizado
deactivate DB
ProdRepo --> BE_Service : sucesso
deactivate ProdRepo

BE_Service --> Controller : order
deactivate BE_Service

Controller --> FE_Service : HTTP 201 Created (Order JSON)
deactivate Controller

FE_Service --> View : pedido finalizado com sucesso
deactivate FE_Service

View -> View : esvaziarCarrinhoLocal()
View --> Cliente : Redirecionar para I_MeusPedidos
deactivate View
@enduml
```

### Consultar Detalhes do Pedido
- Por imagem:
![alt text](DS_consultar_detalhes_pedido.png)

- Codificação:
``` plantuml
@startuml
autonumber
skinparam responseMessageBelowArrow true

actor "Cliente" as Cliente

box "Frontend React" #LightBlue
    participant "I_MeusPedidos" as View
    participant "orderService (FE)" as FE_Service
end box

box "Backend Spring Boot" #LightGreen
    participant "OrderController" as Controller
    participant "OrderService (BE)" as BE_Service
    participant "OrderRepository" as Repo
end box

database "Banco de Dados" as DB

Cliente -> View : Acessar histórico de pedidos
activate View

View -> FE_Service : getOrderDetails(clienteId)
activate FE_Service

FE_Service -> Controller : GET /api/orders/customer/{clienteId}
activate Controller

Controller -> BE_Service : getOrdersByCustomer(clienteId)
activate BE_Service

BE_Service -> Repo : findDetailedOrdersByCustomerId(clienteId)
activate Repo
note over Repo, DB : SELECT complexo cruzando orders, order_items, products e user_accounts
Repo -> DB : SELECT * FROM orders JOIN ... WHERE customer_id = ?
activate DB
DB --> Repo : Dados consolidados
deactivate DB
Repo --> BE_Service : List<OrderDTO>
deactivate Repo

BE_Service --> Controller : List<OrderDTO>
deactivate BE_Service

Controller --> FE_Service : HTTP 200 OK (List<OrderDTO> JSON)
deactivate Controller

FE_Service --> View : dados dos cartões detalhados
deactivate FE_Service

View --> Cliente : Renderiza os cards detalhados contendo itens, preços e endereço
deactivate View
@enduml
```

### Atualizar Status do Pedido
- Por imagem:
![alt text](DS_atualizar_status_pedido.png)

- Codificação:
``` plantuml
@startuml
autonumber
skinparam responseMessageBelowArrow true

actor "Administrador" as Admin

box "Frontend React" #LightBlue
    participant "I_PainelDoLojista" as View
    participant "orderService (FE)" as FE_Service
end box

box "Backend Spring Boot" #LightGreen
    participant "OrderController" as Controller
    participant "OrderService (BE)" as BE_Service
    participant "OrderRepository" as Repo
end box

database "Banco de Dados" as DB

Admin -> View : Mudar o status do pedido e clicar em "Salvar"
activate View

View -> FE_Service : updateStatus(pedidoId, novoStatus)
activate FE_Service

FE_Service -> Controller : PUT /api/orders/{id}/status (StatusRequest)
activate Controller

Controller -> BE_Service : updateOrderStatus(id, request)
activate BE_Service

BE_Service -> Repo : findById(id)
activate Repo
Repo -> DB : SELECT * FROM orders WHERE id = id
activate DB
DB --> Repo : dados do pedido
deactivate DB
Repo --> BE_Service : Optional<Order>
deactivate Repo

BE_Service -> BE_Service : validarFluxoLogicoStatus()

BE_Service -> Repo : save(order)
activate Repo
Repo -> DB : UPDATE orders SET status = ? WHERE id = ?
activate DB
DB --> Repo : status atualizado
deactivate DB
Repo --> BE_Service : order
deactivate Repo

BE_Service --> Controller : order
deactivate BE_Service

Controller --> FE_Service : HTTP 200 OK (Order JSON)
deactivate Controller

FE_Service --> View : status modificado
deactivate FE_Service

View -> View : recarregarTabelaPedidos()
View --> Admin : Atualiza a tabela com o novo status logístico
deactivate View
@enduml
```

### Cancelar Pedido
- Por imagem:
![alt text](DS_cancelar_pedido.png)

- Codificação:
``` plantuml
@startuml
autonumber
skinparam responseMessageBelowArrow true

actor "Administrador" as Admin

box "Frontend React" #LightBlue
    participant "I_PainelDoLojista" as View
    participant "orderService (FE)" as FE_Service
end box

box "Backend Spring Boot" #LightGreen
    participant "OrderController" as Controller
    participant "OrderService (BE)" as BE_Service
    participant "OrderRepository" as Repo
    participant "ProductRepository" as ProdRepo
end box

database "Banco de Dados" as DB

Admin -> View : Selecionar opção de cancelar o pedido e confirmar no modal
activate View

View -> FE_Service : cancelOrder(pedidoId)
activate FE_Service

FE_Service -> Controller : PUT /api/orders/{id}/cancel
activate Controller

Controller -> BE_Service : cancelOrder(id)
activate BE_Service

note over BE_Service, DB : Início do Estorno e Cancelamento (@Transactional)

BE_Service -> Repo : findById(id)
activate Repo
Repo -> DB : SELECT * FROM orders WHERE id = id
activate DB
DB --> Repo : dados do pedido (com itens incluídos)
deactivate DB
Repo --> BE_Service : Optional<Order>
deactivate Repo

loop Para cada item contido no pedido (order.getItems())
    BE_Service -> ProdRepo : devolverEstoque(productId, quantity)
    activate ProdRepo
    ProdRepo -> DB : UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?
    activate DB
    DB --> ProdRepo : quantidade estornada
    deactivate DB
    ProdRepo --> BE_Service : sucesso
    deactivate ProdRepo
end

BE_Service -> BE_Service : order.setStatus("Cancelado")

BE_Service -> Repo : save(order)
activate Repo
Repo -> DB : UPDATE orders SET status = 'Cancelado' WHERE id = ?
activate DB
DB --> Repo : pedido atualizado para cancelado
deactivate DB
Repo --> BE_Service : order
deactivate Repo

BE_Service --> Controller : order
deactivate BE_Service

Controller --> FE_Service : HTTP 200 OK (Order JSON)
deactivate Controller

FE_Service --> View : cancelamento efetuado
deactivate FE_Service

View --> Admin : Atualiza a lista na tela informando o sucesso do estorno
deactivate View
@enduml
```
