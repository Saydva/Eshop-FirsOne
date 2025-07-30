# Štruktúra backendu eshopu (prehľad)

## Zoznam hlavných foldrov a endpointov

[√] - **/auth**
  - POST `/auth/register` – registrácia používateľa (vracia: user, accessToken, refreshToken)
  - POST `/auth/login` – prihlásenie (vracia: user, accessToken, refreshToken)
  - POST `/auth/logout/:userId` – odhlásenie (vracia: message)
  - POST `/auth/refresh` – refresh tokenu (vracia: accessToken, refreshToken)
  - GET `/auth/user/:userId` – detail používateľa (vracia: user)

[√] - **/user**
  - GET `/user/me` – info o prihlásenom používateľovi (vracia: user)
  - PATCH `/user/me` – úprava profilu (vracia: user)
  - GET `/user` – zoznam používateľov (admin, vracia: users)

[√] - **/product**
  - GET `/product` – zoznam produktov (vracia: [product])
  - GET `/product/:id` – detail produktu (vracia: product)
  - POST `/product` – vytvorenie produktu (vracia: product)
  - PATCH `/product/:id` – úprava produktu (vracia: product)
  - DELETE `/product/:id` – zmazanie produktu (vracia: message)

[√] - **/category**
  - GET `/category` – zoznam kategórií (vracia: [category])
  - POST `/category` – vytvorenie kategórie (vracia: category)
  - PATCH `/category/:id` – úprava kategórie (vracia: category)
  - DELETE `/category/:id` – zmazanie kategórie (vracia: message)

- **/order**
  - POST `/orders` – vytvorenie objednávky (vracia: order)
  - GET `/orders` – zoznam objednávok (admin, vracia: [order])
  - GET `/orders/:id` – detail objednávky (vracia: order)
  - PATCH `/orders/:id` – zmena stavu objednávky (vracia: order)

- **/payment**
  - POST `/payments` – vytvorenie platby (vracia: payment)
  - GET `/payments` – zoznam platieb (admin, vracia: [payment])
  - GET `/payments/:id` – detail platby

