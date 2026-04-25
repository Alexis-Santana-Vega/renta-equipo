# Rentamedic

Rentamedic es una aplicación web desarrollada con **Vue.js 3** que facilita la renta y venta de equipo médico de forma rápida, segura y accesible. Conecta a personas, clínicas y empresas que requieren equipos como concentradores de oxígeno, camas hospitalarias, monitores y otros dispositivos especializados, ya sea de manera temporal o permanente. A través de una plataforma intuitiva, los usuarios pueden explorar el catálogo, comparar opciones, consultar disponibilidad y gestionar pedidos en pocos pasos. Rentamedic reduce tiempos y costos, garantizando calidad, confiabilidad y soporte en cada transacción.

## 🚀 Características

- 📦 **Catálogo de equipos** – Explora y filtra equipos médicos.
- 🔍 **Consulta de disponibilidad** – Visualiza stock y estado en tiempo real.
- 🛒 **Gestión de pedidos** – Realiza solicitudes de renta o compra fácilmente.
- 🌍 **Internacionalización (i18n)** – Soporte multi-idioma.
- 🎨 **UI moderna** – Construida con Vuetify 4.
- 🔐 **Autenticación y autorización** – Acceso seguro con Pinia y Vue Router.
- 📱 **Diseño responsivo** – Funciona en escritorio, tabletas y móviles.

## 🛠 Tecnologías utilizadas

- **Frontend:** Vue.js 3 con Typescript (Composition API)
- **UI Framework:** Vuetify 4
- **Estado:** Pinia
- **Rutas:** Vue Router 4
- **Internacionalización:** Vue I18n (con configuración tipada)
- **Build tool:** Vite
- **Linting/Formato:** ESLint

## 📁 Estructura del proyecto
```markdown
rentamedic/
├── core/                     # Funcionalidad base
│   ├── components/           # Componentes de layout
│   ├── i18n/                 # Configuración global de i18n (con tipado)
│   ├── layouts/              # Layouts para Dashboard, Auth, etc.
│   ├── plugins/              # Registro de Vuetify, Pinia, Router, i18n
│   ├── router/               # Configuración de Router
│   ├── stores/               # Configuración de tienda Pinia
│   └── styles/               # Estilos y variables globales
├── modules/                  # Módulos por funcionalidad
│   ├── auth/                 # Autenticación
│   ├── category/             # Categorías de equipos
│   ├── equipment/            # Gestión de equipos
│   ├── inbound/              # Entradas de inventario
│   ├── outbound/             # Salidas (rentas/ventas)
│   ├── supplier/             # Gestión de proveedores
│   ├── user/                 # Usuarios
│   └── public/               # Páginas públicas (inicio, acerca de...)
│   └── (cada módulo tiene su propio i18n/, router/, types/, views/)
├── shared/                   # Recursos reutilizables
│   ├── components/           # Componentes UI compartidos
│   ├── composables/          # Composición de lógica reutilizable
│   ├── types/                # Tipos TypeScript globales
│   └── utils/                # Funciones de ayuda
└── assets/                   # Archivos estáticos (imágenes, fuentes, etc.)
```

## 📦 Instalación

Sigue estos pasos para configurar el proyecto localmente.

### Requisitos previos

- **Node.js** (versión 18 o superior recomendada)
- **Yarn** (gestor de paquetes)

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Alexis-Santana-Vega/rentamedic.git
   cd rentamedic
   ```

2. **Instalar dependencias**

   ```bash
   yarn install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto si es necesario. Ejemplo:

   ```env
   VITE_WHATSAPP_PHONE_NUMBER=1234567890
   ```

4. **Ejecutar el servidor de desarrollo**

   ```bash
   yarn dev
   ```

5. **Construir para producción**

   ```bash
   yarn build
   ```

   Los archivos generados se guardarán en la carpeta `dist/`.

6. **Previsualizar la versión de producción**

   ```bash
   yarn preview
   ```

7. **Ejecutar el linter**

   ```bash
   yarn lint
   ```

## 📜 Scripts disponibles

| Comando          | Descripción                              |
|------------------|------------------------------------------|
| `yarn dev`       | Inicia el servidor de desarrollo         |
| `yarn build`     | Genera la build de producción            |
| `yarn preview`   | Previsualiza la build localmente         |
| `yarn lint`      | Ejecuta ESLint sobre el código           |


---

**Rentamedic** – Soluciones médicas rápidas, seguras y accesibles.
