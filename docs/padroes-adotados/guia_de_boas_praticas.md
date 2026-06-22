### Guia de Padrões e Boas Práticas de Codificação

Abaixo estão definidas as seis regras fundamentais de codificação que a equipe seguirá durante o ciclo de desenvolvimento do projeto.

**1. Padrão de Notação e Nomenclatura (Obrigatório)**

- **Classes e Interfaces:** Utilizar `PascalCase` (exemplo: `ProductRepository`, `UserController`).
- **Métodos e Variáveis:** Utilizar `camelCase` (exemplo: `calculateTotal`, `userEmail`).
- **Constantes e Enumeradores:** Utilizar `SCREAMING_SNAKE_CASE` (exemplo: `MAX_LOGIN_ATTEMPTS`, `DEFAULT_TIMEOUT`).
- O idioma base para a codificação (nomes de variáveis, métodos e classes) deve ser o inglês, garantindo universalidade e legibilidade técnica, evitando problemas com acentuação e caracteres especiais.

**2. Documentação e Comentários de Código (Obrigatório)**

- **Comentários de bloco:** Utilizar padrões como Javadoc (Backend) ou JSDoc (Frontend) para documentar o objetivo de classes principais, interfaces e métodos públicos, descrevendo parâmetros de entrada, tipos de retorno e possíveis exceções lançadas.
- **Comentários inline:** Devem ser utilizados exclusivamente para explicar o _porquê_ de uma decisão técnica complexa ou uma regra de negócio muito específica.
- É estritamente proibido comentar o _que_ o código está fazendo em operações óbvias (exemplo: `// soma 1 ao contador` acima de um `i++`) e deixar "código zumbi" (código comentado e desativado) na versão final.

**3. Nomes Significativos e Intuitivos (Clean Code)**

- Variáveis, classes e métodos devem ter nomes que revelem imediatamente a sua intenção e contexto no sistema.
- A equipe não deve utilizar abreviações confusas, siglas não universais ou letras isoladas (exceto em contadores de laços pequenos e óbvios, como `i` ou `j`).
- Evitar nomes genéricos como `dados`, `info`, `temp` ou `flag`. Deve-se preferir nomes altamente descritivos como `customerAddressData` ou `isUserActive`.

**4. Princípio da Responsabilidade Única (SOLID - SRP)**

- Cada classe, módulo ou método deve ter apenas um motivo para mudar, ou seja, deve realizar apenas uma tarefa bem definida e de forma excelente.
- Regra prática: se a descrição natural do que uma função faz possui a palavra "e" (exemplo: "valida o usuário _e_ envia email de confirmação"), essa função está ferindo o SRP e deve ser refatorada em duas funções menores e independentes.

**5. Tratamento Adequado de Exceções (Clean Code)**

- Blocos `try/catch` devem ser utilizados para capturar exceções específicas da operação, evitando capturar a classe genérica `Exception` de forma indiscriminada.
- É expressamente proibido utilizar blocos `catch` vazios (prática conhecida como "engolir exceções"). Todo erro capturado deve ser devidamente tratado, logado no sistema e, quando aplicável, retornar uma mensagem clara e amigável para o front-end ou usuário final.

**6. Eliminação de Números e Strings Mágicos (Clean Code)**

- Valores literais numéricos ou textos que possuem significado lógico para a regra de negócio não devem ser "chumbados" (inseridos diretamente) no meio da lógica de programação.
- Eles devem ser extraídos e declarados como constantes globais ou em enumeradores (`Enums`) no topo da classe ou em arquivos de configuração, facilitando a manutenção futura (exemplo: em vez de usar `if (status == 2)`, utilizar `if (status == Status.PAID)`).
