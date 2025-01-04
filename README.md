<h1>GuitarLA - Aprendiendo TypeScript</h1>

---

## ¿Qué es TypeScript y sus ventajas?
TypeScript es un lenguaje de programación desarrollado por Microsoft que extiende JavaScript añadiendo tipado estático. Esto significa que puedes definir los tipos de datos de tus variables, funciones, y otros elementos, permitiendo un desarrollo más robusto y mantenible.

### Ventajas:

- **Tipado Estático**: Ayuda a prevenir errores durante el desarrollo.

- **Autocompletado**: Mejora la productividad gracias a un soporte más completo en los editores de código.
- **Refactorización Segura**: Cambios en el código son más seguros y controlados.
- **Compatibilidad con JavaScript**: Todo código TypeScript se compila a JavaScript.
- **Mejor Documentación**: El tipado actúa como una forma de documentar el código.

---

## Primitive Types

Los tipos primitivos son los más básicos en TypeScript y se utilizan para representar datos simples.

- **string**: Representa texto.
  ```ts
  const name: string = "Guitarra";
  ```
- **number**: Representa números.
  ```ts
  const price: number = 100;
  ```
- **boolean**: Representa valores verdaderos o falsos.
  ```ts
  const isAvailable: boolean = true;
  ```
- **null** y **undefined**: Representan valores vacíos o no definidos.

---

## Types e Interfaces
### Types
Un type define un tipo personalizado en TypeScript.
```ts
type Guitar = {
  id: string;
  name: string;
  price: number;
};
```

### Interfaces
Una interface también define la forma de un objeto pero permite extensión de otros tipos.
```ts
interface Guitar {
  id: string;
  name: string;
  price: number;
}
```

---

## Inline Type
Puedes definir un tipo directamente dentro de una función o variable.
```ts
const getGuitar = (id: string): { id: string; name: string; price: number } => {
  return { id, name: "Acústica", price: 200 };
};
```

---

## Type Separado
Definir tipos separados ayuda a la reutilización y la claridad.
```ts
type Guitar = {
  id: string;
  name: string;
  price: number;
};

const getGuitar = (id: string): Guitar => {
  return { id, name: "Eléctrica", price: 300 };
};
```

---

## Creando un Archivo de Types ¿Dónde y cómo hacerlo?
Se recomienda crear un archivo con extensión `.d.ts` o un archivo dedicado para los tipos, generalmente en una carpeta llamada `types` dentro del proyecto.

1. **Ubicación**: \`src/types/\`
2. **Nombre del archivo**: \`index.ts\`
3. **Estructura del archivo**:
```ts
export type Guitar = {
  id: string;
  name: string;
  price: number;
};
```
Luego puedes importarlo en cualquier parte del proyecto:
```ts
import type { Guitar } from "../types";
```

---

## Heredar y Extender un Type
Puedes crear nuevos tipos basados en otros usando el operador `&` (intersección).
```ts
type Guitar = {
  id: string;
  name: string;
};

type ExtendedGuitar = Guitar & {
  price: number;
  isAvailable: boolean;
};
```

---

## Utility Types en TypeScript
TypeScript proporciona tipos utilitarios para trabajar con tipos de manera más eficiente.

- **Pick**: Selecciona un subconjunto de propiedades de un tipo.
  ```ts
  type GuitarSummary = Pick<Guitar, "id" | "name">;
  ```

- **Omit**: Excluye propiedades de un tipo.
  ```ts
  type GuitarWithoutPrice = Omit<Guitar, "price">;
  ```

- **Partial**: Convierte todas las propiedades en opcionales.
  ```ts
  type PartialGuitar = Partial<Guitar>;
  ```

- **Required**: Convierte todas las propiedades en obligatorias.
  ```ts
  type RequiredGuitar = Required<Guitar>;
  ```

---

## Creando un Type para el ID de la guitarra (método lookup)
Puedes crear un tipo que represente solo el ID de un objeto utilizando el operador de indexación.
```ts
type Guitar = {
  id: string;
  name: string;
  price: number;
};

type GuitarID = Guitar["id"];

const guitarId: GuitarID = "12345";
```
