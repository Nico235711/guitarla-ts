# Guitar LA (versión TypeScript)

Aplicación desarrollada con React y TypeScript que simula una tienda de guitarras. Permite visualizar un catálogo de productos y agregar artículos al carrito de compras.

## Características

- Catálogo de guitarras.
- Componentes reutilizables.
- Gestión de estado con `useState`.
- Renderizado dinámico de listas.
- Comunicación entre componentes mediante props.
- Carrito de compras.
- Diseño responsive.

## Tecnologías

- React
- JavaScript (ES6+) / TypeScript
- Vite
- CSS

## Instalación

1. Clonar el repositorio
2. Entrar al proyecto

```bash
cd guitala-ts
```

3. Instalar dependencias

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Estructura del proyecto

```
src/
├── components/
│   ├── Guitar.tsx
│   ├── Header.tsx
├── data/
│   ├── db.ts
│   hooks/
│   ├── useCart.ts
│   types/
│   ├── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Funcionalidades

- Mostrar el listado de guitarras.
- Agregar productos al carrito.
- Actualizar cantidades.
- Calcular el total de la compra.
- Vaciar el carrito.
- Persistencia del carrito (si se implementó con Local Storage).

## Conceptos de React utilizados

- Componentes funcionales
- JSX / TSX
- Props
- useState
- Renderizado condicional
- Renderizado de listas con `map`
- Keys
- Manejo de eventos