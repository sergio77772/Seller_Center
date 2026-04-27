# Seller Center — Fullstack Technical Challenge

Solución al desafío técnico Fullstack Senior: **Java Spring Boot + Node.js BFF + React + PostgreSQL**.

---

## 🏗️ Arquitectura

```
Browser → Frontend (React) → MS-B BFF (Node.js) → MS-A API (Java Spring Boot) → PostgreSQL
```

| Componente | Tecnología | Puerto |
|---|---|---|
| MS-A | Java 17 + Spring Boot 3 | 8080 |
| MS-B | Node.js + Express + TypeScript | 3001 |
| Frontend | React 19 + TypeScript + Vite | 80 |
| Base de datos | PostgreSQL 16 | 5432 |

---

## 🚀 Cómo correr el proyecto

### Opción A — Docker Compose (recomendado)

**Requisitos:** Docker Desktop instalado

```bash
git clone https://github.com/sergio77772/Seller_Center.git
cd Seller_Center
docker-compose up --build
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost |
| BFF (MS-B) | http://localhost:3001 |
| API (MS-A) | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |

---

### Opción B — Local (sin Docker)

**Requisitos:** Java 17+, Node.js 20+, PostgreSQL 16

#### 1. Base de datos

```sql
CREATE DATABASE seller_center;
```

#### 2. MS-A (Java Spring Boot)

```bash
cd ms-a
cp .env.example .env
./gradlew bootRun
```

Variables de entorno requeridas en `.env`:

```
DB_URL=jdbc:postgresql://localhost:5432/seller_center
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

#### 3. MS-B (Node.js BFF)

```bash
cd ms-b
cp .env.example .env
npm install
npm run dev
```

Variables de entorno requeridas en `.env`:

```
MS_A_URL=http://localhost:8080
PORT=3001
```

#### 4. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Variables de entorno requeridas en `.env`:

```
VITE_BFF_URL=http://localhost:3001
```

---

## 🧪 Tests

#### MS-A (JUnit 5 + Mockito)

```bash
cd ms-a
./gradlew test
```

#### MS-B (Jest + ts-jest)

```bash
cd ms-b
npm test
```

---

## 📋 Endpoints de la API

Documentación completa disponible en Swagger UI: `http://localhost:8080/swagger-ui/index.html`

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/clientes` | Crear un nuevo cliente |
| `GET` | `/api/clientes` | Listar todos los clientes con fecha probable de fallecimiento |
| `GET` | `/api/clientes/kpi` | Promedio de edad y desviación estándar |

El BFF expone los mismos endpoints bajo `/bff/clientes`.

---

## 🌐 Deploy

| Servicio | URL |
|---|---|
| Frontend | _TODO_ |
| MS-B (BFF) | _TODO_ |
| MS-A + Swagger | _TODO_ |

---

## 🔧 Decisiones técnicas

- **Separación de responsabilidades**: el Frontend nunca llama directamente al MS-A; toda la comunicación pasa por el BFF (MS-B), que actúa como proxy y punto único de entrada.
- **Validaciones en múltiples capas**: validación client-side en el formulario React + validación server-side con Bean Validation (`@NotBlank`, `@Min`, `@Max`, `@Past`) en el MS-A.
- **Manejo de errores centralizado**: `GlobalExceptionHandler` en Spring Boot captura excepciones y devuelve respuestas estructuradas sin exponer stacktraces.
- **Variables de entorno**: ninguna credencial está hardcodeada. Se usan `.env` con `.env.example` como guía en los tres componentes.
- **CSS Modules**: los estilos del frontend están encapsulados por componente para evitar colisiones de clases globales.
- **Logs**: logging con SLF4J (`@Slf4j`) en MS-A y Morgan en MS-B para observabilidad del flujo.
- **Docker multi-stage builds**: los Dockerfiles usan builds en dos etapas para reducir el tamaño de las imágenes finales de producción.
- **Nomenclatura en inglés**: todo el código interno (métodos, variables, funciones) está en inglés. Los campos del dominio de negocio (`nombre`, `apellido`, `fechaNacimiento`) se mantienen en español por ser parte del contrato definido en el challenge.

---

## 🤖 Herramientas de IA utilizadas

Durante el desarrollo se utilizó **claude y chat gpt para analizar errores al momento de crear el docker file , para unos errores de PostgreSQL y para ajustar este readme** :

