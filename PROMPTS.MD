## 📐 Frontend Development

### 1. Universal App Layout
👉 "Create a professional, responsive, mobile-first app layout with smooth page transitions. Include a Header/Navbar with a toggleable sidebar (visible only on mobile screens), and a Footer fixed at the bottom. Implement full internationalization (i18n) across all pages, components, buttons, and texts, supporting English, Spanish, Portuguese, Italian, Chinese, Japanese, and Korean. Add a language switcher in the Navbar and configure navigation so each language uses a distinct URL path. Also, implement Dark/Light Mode throughout the app, ensuring consistent colors, contrast, and accessibility in both themes. Think like a senior developer and a UI/UX designer: focus on clean design, fluid responsiveness, and visually appealing interactions."

### 2. Frontend Component Design
👉 "Build reusable React components with TailwindCSS for [feature: dynamic forms, dashboards, data tables, etc.]. Include props, state management, and responsive design."

### 3. State Management & Data Flow
👉 "Design a state management strategy for a [React/Zustand/Redux] app that handles [use case: live data updates, undo/redo, offline sync]. Explain context providers, hooks, and store slices."

### 4. UX/UI Flow Design
👉 "Propose an intuitive user flow and wireframe for [feature, e.g., onboarding, checkout, material classification]. Include navigation, error states, and accessibility guidelines."

### 5. Frontend Performance Optimization
👉 "Suggest performance optimization strategies for a frontend app. Include code splitting, lazy loading, image optimization, bundle size reduction, virtual scrolling, memoization, and React performance patterns."

### 6. Progressive Web App (PWA) Implementation
👉 "Transform a web application into a Progressive Web App (PWA). Include service worker setup, offline functionality, push notifications, app manifest, install prompts, and caching strategies."

---

## 🔧 Backend Development

### 7. API Design
👉 "Create REST/GraphQL API endpoints for [feature: user authentication, file uploads, AI classification, etc.]. Include input validation, request/response DTOs, error handling, and example requests."

### 8. Database & Entities
👉 "Generate SQL schema and TypeORM entities for an app that manages [describe data: users, products, bins, materials, etc.]. Include relationships, constraints, and seed data examples."

### 9. Backend Performance & Scalability
👉 "Suggest performance optimization strategies for a backend app. Include caching (Redis), database query optimization, pagination, connection pooling, async processing, and load balancing strategies."

### 10. Real-time Communication
👉 "Implement real-time features using [WebSockets/Server-Sent Events/GraphQL Subscriptions] for [use case: chat, live updates, notifications]. Include connection management, reconnection logic, and message queuing."

### 11. File Upload & Storage
👉 "Design and implement a secure file upload system supporting [requirements: multiple files, large files, image processing, cloud storage integration]. Include validation, virus scanning, progress tracking, and storage optimization."

### 12. Background Jobs & Task Queues
👉 "Set up a background job processing system using [Bull/BullMQ/Celery/Sidekiq] for [tasks: email sending, image processing, data exports]. Include job prioritization, retry logic, and monitoring."

---

## 🏗️ Full-Stack Architecture

### 13. Project Planning & Architecture
👉 "Design a scalable software architecture for [type of app] using [stack]. Include modules, services, APIs, and database schema with justifications."

### 14. Maintainable, Scalable Project Structure
👉 "Propose and apply a maintainable, scalable project architecture suitable for a medium-to-large front-end or full-stack application, independent of specific frameworks.

• Organization: Prefer a feature-first structure. Each feature folder contains its UI, logic, types, tests, and localized strings. Shared resources (design tokens, utilities, icons, primitives) live in a shared/ area with clear ownership.
• Boundaries: Enforce clear dependency rules (features may depend on shared primitives but not on each other directly unless via defined public interfaces). Provide guidance or lint rules/templates to protect boundaries.
• Naming & APIs: Each feature exposes a minimal public API (barrel file) and hides internals. Establish conventions for naming files, events, and public exports.
• Internationalization: Each feature owns its translation resources and can lazy-load them with the route or surface that needs them.
• Theming & Design: Centralize tokens (colors, spacing, typography, radii, shadows, motion). Avoid hard-coding visual values in components.
• Testing & QA: Include structure for unit, integration, and accessibility tests; provide test utilities/mocks and a recommended coverage strategy.
• Performance: Document a code-splitting strategy (by route and by feature), set performance budgets, and identify where caching and memoization apply.
• Documentation: Output a target directory tree, migration steps from a typical ad-hoc structure, example refactors for 2–3 features, a glossary of boundaries, and a PR checklist (naming, tests, a11y, performance, i18n).

Return the proposed folder tree, rationale for each layer, example imports, boundary rules, and a step-by-step migration plan."

### 15. Migration Strategy
👉 "Design a migration plan to move from [tech A] to [tech B] (e.g., MongoDB → Postgres, REST → GraphQL, JavaScript → TypeScript). Include data migration steps, compatibility issues, testing strategy, and rollback procedures."

### 16. Microservices Architecture
👉 "Design a microservices architecture for [application domain]. Include service boundaries, inter-service communication (REST/gRPC/Message Queue), API gateway, service discovery, and distributed data management."

### 17. Domain-Driven Design (DDD)
👉 "Apply Domain-Driven Design principles to model [domain: e-commerce, healthcare, finance, etc.]. Identify bounded contexts, aggregate roots, value objects, domain events, and create a clear domain model."

---

## 🔐 Security & Best Practices

### 18. Security Implementation
👉 "List and implement security best practices for a [stack: NestJS + React] app handling user authentication and sensitive data. Include JWT, OAuth2, CSRF, CORS, rate limiting, input sanitization, SQL injection prevention, and security logging."

### 19. Authentication & Authorization
👉 "Design and implement a comprehensive authentication and authorization system for [application type]. Include user registration, login, password reset, email verification, role-based access control (RBAC), and session management."

### 20. Data Privacy & GDPR Compliance
👉 "Implement data privacy and GDPR compliance features including user consent management, data export, right to deletion, cookie consent, privacy policy integration, and audit logging."

---

## 🧪 Testing & Quality Assurance

### 21. Generate Unit Tests
👉 "Generate comprehensive unit tests for the following [function/component/class]: [paste code]. Use [Jest/Vitest/Mocha] with [TypeScript/JavaScript]. Include happy paths, edge cases, error scenarios, boundary conditions, and verify all return values and side effects. Use proper mocking for dependencies and include test descriptions that clearly explain what each test validates."

### 22. Generate Integration Tests
👉 "Create integration tests for [feature/module/API] using [Jest/Vitest/Cypress]. Test the interaction between multiple components/services, database operations, API endpoints, and external dependencies. Include setup/teardown, test data management, and assertions for complete workflows."

### 23. Generate Component Tests (React/Vue)
👉 "Generate component tests for this [React/Vue] component: [paste component code]. Use [React Testing Library/Vue Test Utils] with [Jest/Vitest]. Test rendering, user interactions (clicks, inputs, form submissions), props changes, conditional rendering, accessibility, and integration with hooks/context. Include snapshot tests if applicable."

### 24. Generate API/Endpoint Tests
👉 "Create comprehensive API tests for [endpoint/route] using [Jest/Supertest/Postman]. Include tests for: successful requests with valid data, validation errors, authentication/authorization, error handling, status codes, response structure, edge cases, and performance benchmarks. Generate example request/response payloads."

### 25. Generate Database/Repository Tests
👉 "Generate tests for database operations and repository layer for [entity/model]. Include tests for CRUD operations, queries, transactions, relationships, constraints, data validation, error handling (connection failures, constraint violations), and use test database with proper setup/cleanup."

### 26. Generate Mock Data & Test Fixtures
👉 "Generate realistic mock data and test fixtures for [entities/models]. Include factory functions, seeders, and test data builders. Cover edge cases, boundary values, and various data scenarios (empty, null, invalid, valid with different lengths/types). Make data realistic and diverse for comprehensive testing."

### 27. Generate Snapshot Tests
👉 "Generate snapshot tests for [component/view] using [Jest/Vitest]. Include initial render snapshots, state change snapshots, prop variation snapshots, and update snapshots when intentional changes occur. Document when snapshots should be updated."

### 28. End-to-End Testing
👉 "Set up end-to-end testing for [application] using [Cypress/Playwright/Selenium]. Include test scenarios for critical user flows, visual regression testing, and CI/CD integration. Generate test scripts for: user registration, login, key feature workflows, error handling, and cross-browser compatibility."

### 29. Accessibility Testing
👉 "Audit and ensure accessibility compliance (WCAG 2.1 AA) for [application/component]. Include automated testing, manual testing checklist, ARIA labels, keyboard navigation, screen reader compatibility, and accessibility testing tools setup. Generate accessibility test suites using [Jest-axe/Cypress-axe]."

### 30. Performance Testing
👉 "Design and implement performance testing strategy using [Lighthouse/WebPageTest/k6/Artillery]. Include load testing, stress testing, performance budgets, and monitoring of Core Web Vitals. Generate performance test scripts and benchmarks."

### 31. Test Coverage Analysis
👉 "Analyze test coverage for [project/module] and generate a coverage report. Identify untested code paths, suggest additional test cases to improve coverage, and set up coverage thresholds. Include line, branch, function, and statement coverage analysis."

### 32. Generate Test Setup & Configuration
👉 "Set up testing infrastructure for [project] using [testing framework]. Include test configuration files, test utilities/helpers, custom matchers, global setup/teardown, test environment variables, mocking strategies, and CI/CD test execution configuration."

### 33. Contract Testing (API Contracts)
👉 "Generate contract tests for API integration using [Pact/Contract testing tool]. Define contracts between services, generate consumer and provider tests, and verify API compatibility. Include examples of request/response schemas and validation rules."

### 34. Visual Regression Testing
👉 "Set up visual regression testing for [UI components/pages] using [Percy/Chromatic/BackstopJS]. Generate baseline screenshots, comparison tests, and handle visual changes. Include responsive breakpoint testing and cross-browser visual comparisons."

### 35. Property-Based Testing
👉 "Generate property-based tests for [function/module] using [Fast-Check/JSVerify]. Define properties that should always hold true, generate random inputs, and find edge cases through automated exploration. Include shrinking strategies for failure cases."

### 36. Test-Driven Development (TDD) Workflow
👉 "Generate a TDD workflow for implementing [feature]. Start with failing tests, then implement minimal code to pass, refactor, and repeat. Include test cases for each requirement, red-green-refactor cycle, and test coverage milestones."

### 37. Mutation Testing
👉 "Set up mutation testing for [codebase] using [Stryker]. Configure mutation operators, generate mutation reports, and identify weak tests. Analyze mutation score and suggest improvements to test quality."

### 38. Code Review & Refactoring
👉 "Review the following code for readability, maintainability, and performance. Suggest refactors with TypeScript typing, modularization, and design patterns: [paste code]. Include suggestions for improving testability and generating corresponding tests."

---

## 🚀 DevOps & Infrastructure

### 39. CI/CD Pipeline
👉 "Set up a CI/CD pipeline for a full-stack app with [stack]. Include linting, testing, Docker builds, migrations (Flyway/Prisma), staging vs production environments, and deployment steps."

### 40. Docker & Containerization
👉 "Containerize a [application type] using Docker. Include multi-stage builds, docker-compose for local development, environment variable management, and optimization strategies."

### 41. Cloud Deployment
👉 "Design a cloud deployment strategy for [AWS/Azure/GCP] including infrastructure as code (Terraform/CloudFormation), container orchestration (ECS/EKS/Kubernetes), auto-scaling, and monitoring setup."

### 42. Monitoring & Observability
👉 "Set up observability for a full-stack app using [stack]. Include logging, metrics, distributed tracing, and alerting with tools like Prometheus, Grafana, ELK Stack, or Datadog."

### 43. Infrastructure as Code (IaC)
👉 "Create infrastructure as code using [Terraform/Pulumi/CloudFormation] for [cloud provider]. Include networking, compute resources, databases, load balancers, and security groups."

---

## 🔍 Debugging & Maintenance

### 44. Debugging & Error Diagnosis
👉 "Analyze this error log and suggest possible root causes and fixes: [paste stack trace or error message]. Propose monitoring tools to prevent recurrence."

### 45. Error Handling Strategy
👉 "Design a comprehensive error handling strategy for [frontend/backend/full-stack]. Include error types, user-friendly error messages, error logging, error boundaries, retry mechanisms, and error tracking integration (Sentry/Rollbar)."

### 46. Logging & Debugging Tools
👉 "Set up structured logging and debugging tools for [application]. Include log levels, log aggregation, distributed tracing, debug mode configurations, and log retention policies."

---

## 🔌 Integration & APIs

### 47. Third-Party API Integration
👉 "Show how to integrate [API: Firefly, Supabase, Google Maps, Stripe, SendGrid] into a [stack] app. Include authentication, request/response handling, error recovery, rate limiting, and webhook handling."

### 48. Payment Integration
👉 "Integrate payment processing using [Stripe/PayPal/Square] into [application]. Include payment flows, subscription management, webhook handling, fraud prevention, and PCI compliance considerations."

### 49. Email & Notification System
👉 "Implement an email and notification system using [SendGrid/Mailgun/AWS SES]. Include transactional emails, templates, email verification, notification preferences, and delivery tracking."

### 50. Social Authentication
👉 "Implement social login (OAuth 2.0) using [Google/Facebook/GitHub/Apple] for [application]. Include account linking, profile synchronization, and error handling."

---

## 🤖 AI/ML Integration

### 51. AI/ML Integration
👉 "Integrate an AI model (e.g., GPT, OCR, Vision API) into [use case]. Provide prompt design, request payloads, caching strategies, fallback handling when AI fails, and cost optimization."

### 52. AI Chatbot Implementation
👉 "Design and implement an AI-powered chatbot for [use case]. Include conversation flow, context management, fallback responses, integration with LLM APIs, and user feedback mechanisms."

### 53. Image & Document Processing
👉 "Implement image/document processing using AI services (OCR, object detection, text extraction). Include file upload, preprocessing, API integration, result storage, and error handling."

---

## 📱 Specialized Features & Components

### 54. Persistent Support Chatbot Widget
👉 "Design and implement a persistent 'Support Chatbot' widget that remains accessible in a bottom corner of the application across all pages. Requirements:

• Placement & behavior: Floating launcher button; expands to a panel or modal with smooth open/close animation. Must not overlap critical notifications or obstruct primary actions. Persists across navigation.
• Conversation UI: Message bubbles for user/assistant, timestamps, loading/streaming indicator, retry on error, and a 'suggested questions' area with clickable chips. Provide graceful handling for optional file attachments (images/PDF) with clear states.
• Accessibility: Full keyboard navigation, focus management, ARIA labels/roles, Esc to close; comply with contrast and motion-reduction preferences.
• Internationalization: All labels, placeholders, and messages are translatable. Include sample resources for English, Spanish, Portuguese, Italian, Chinese, Japanese, and Korean. Provide a language switch control or use the app's current language automatically.
• Theming: Works in light and dark themes with consistent contrast, states (hover/active/disabled), and error/warning/success tokens.
• State & privacy: Maintain recent conversation history per session with a bounded limit; allow clearing history. Respect user privacy—document what is stored locally vs sent to the server.
• Service abstraction: Provide a single function like sendMessage({ messages, attachments?, locale }) that can target different backends (LLM vendor or custom API). Include error handling, basic client-side rate limiting, and exponential backoff.
• Telemetry: Emit events for open/close, send, receive, select_suggested, error.
• Deliverables: Component breakdown, interaction flows, data types, sample styles/tokens, test plan (unit + accessibility checks), and setup instructions for wiring to any backend."

### 55. Search & Filtering System
👉 "Implement a comprehensive search and filtering system for [data type: products, users, content]. Include full-text search, faceted filters, autocomplete, search suggestions, result ranking, and performance optimization."

### 56. Data Visualization & Dashboards
👉 "Create interactive data visualization dashboards using [D3.js/Chart.js/Recharts/Tableau]. Include real-time updates, filtering, drill-down capabilities, export functionality, and responsive design."

### 57. Form Builder & Dynamic Forms
👉 "Build a dynamic form builder that allows users to create custom forms. Include field types, validation rules, conditional logic, form templates, and form submission handling."

### 58. Calendar & Scheduling System
👉 "Implement a calendar and scheduling system with [features: event creation, recurring events, timezone support, availability checking, reminders]. Include drag-and-drop, multi-view support, and integration with external calendars."

---

## 📋 Project Management & Planning

### 59. User Stories & Requirements
👉 "Transform this feature idea into detailed user stories and acceptance criteria for Agile sprints: [describe feature]. Include edge cases, priority levels, and definition of done."

### 60. Technical Specification Document
👉 "Create a comprehensive technical specification document for [feature/project]. Include architecture overview, API contracts, data models, security considerations, performance requirements, and implementation timeline."

### 61. Team Collaboration & Coding Standards
👉 "Create a coding standards & collaboration guide for a team using [stack]. Include folder structure, commit conventions (Conventional Commits), code review rules, Git branching strategy (GitFlow/GitHub Flow), and PR templates."

### 62. Agile Planning & Sprint Management
👉 "Design an Agile workflow for [project] including sprint planning, backlog management, user story estimation, daily standups structure, sprint retrospective format, and velocity tracking."

---

## 📚 Documentation

### 63. Developer Documentation & Onboarding
👉 "Generate developer documentation and onboarding guide for a [stack] app. Include API reference, setup instructions, environment variables, common commands, contribution guidelines, and troubleshooting guide."

### 64. All-in-One Documentation & Artifacts
👉 "Generate a complete technical and non-technical documentation package for my software project. Assume the project is a modern full-stack web application. Deliverables must include:

1. Non-Technical Documentation
   • Executive summary: What the project does, target users, main value.
   • Features overview: Core features described in simple language.
   • User guide: How to access, navigate, and use the system (with examples, screenshots placeholders, and step-by-step flows).
   • FAQ: Common user questions and answers.
   • Glossary: Definitions of important terms for non-technical stakeholders.

2. Technical Documentation
   • Architecture overview: High-level explanation of system components (frontend, backend, database, integrations, auth, third-party APIs).
   • Detailed architecture diagrams:
     - Component diagram (modules and their relationships).
     - Sequence diagram (for a core flow like login or data upload).
     - Deployment diagram (showing servers, containers, environments).
     - Database schema diagram with entities, attributes, and relations.
   • Tech stack description: Languages, frameworks, databases, hosting/deployment platforms, libraries.
   • Design decisions: Key trade-offs (e.g., why REST vs GraphQL, why chosen database).
   • Scalability & security notes: Sharding, caching, authentication, authorization, rate limiting, data privacy.
   • Error handling & logging: How the system manages errors, retries, monitoring, and observability.

3. API & Integration Documentation
   • Endpoints reference: For every existing endpoint, provide method, URL, query/body params, headers, example requests and responses, error codes.
   • If endpoints do not exist, create plausible ones based on the system's features (auth, CRUD, search, AI integration, etc.).
   • Authentication flows: Login, refresh tokens, session management.
   • Rate limits & pagination: How to use them in requests.
   • HTTP test files: Produce .http files (or cURL/Postman collection) to test all endpoints with example payloads and auth tokens.

4. Development & Operations
   • Folder/file structure: Show recommended project architecture for maintainability.
   • Setup guide: Installation, environment variables, database migrations, seeding data.
   • CI/CD pipeline: Example workflow steps (linting, testing, build, deploy).
   • Testing strategy: Unit, integration, end-to-end; tools to use; coverage goals.
   • Versioning & branching strategy: Git conventions, release strategy.
   • Monitoring & alerts: Suggested tools and what metrics to track.

5. Appendices
   • Sample data & fixtures.
   • Conventions: Naming, coding style, commit messages.
   • Future roadmap: Suggested improvements and scalability features.

Requirements:
   • The documentation must be clear for both developers and non-technical stakeholders.
   • Use diagrams (mermaid syntax or similar) for all architectural visualizations.
   • Format as a structured deliverable (Markdown, with sections, sub-sections, code blocks, diagrams).
   • All examples must be realistic and consistent across docs, diagrams, and HTTP test files.
   • Provide everything as if this were a production-ready project handbook."

### 65. API Documentation (OpenAPI/Swagger)
👉 "Generate comprehensive API documentation using OpenAPI/Swagger for [API]. Include all endpoints, request/response schemas, authentication methods, error codes, and interactive API explorer setup."

---

## 🔄 Automation & Scripting

### 66. Automation Scripts
👉 "Generate a shell/Node.js/Python script to automate [task: database backups, migrations, API testing, dependency updates, etc.]. Explain step by step."

### 67. Database Migration Scripts
👉 "Create database migration scripts for [database type] to handle schema changes, data migrations, rollbacks, and version control. Include best practices and migration testing strategies."

### 68. Data Seeding & Fixtures
👉 "Generate seed data and fixture scripts for [application]. Include realistic test data, relationships, and strategies for different environments (development, staging, testing)."

---

## 📊 Analytics & Tracking

### 69. Analytics Implementation
👉 "Implement analytics tracking using [Google Analytics/Mixpanel/Amplitude] for [application]. Include event tracking, user journeys, conversion funnels, custom events, and privacy-compliant tracking."

### 70. A/B Testing Setup
👉 "Design and implement an A/B testing framework for [application]. Include experiment configuration, variant management, statistical significance testing, and results analysis."

---

## 🌐 Internationalization (i18n)

### 71. Complete i18n Implementation
👉 "Implement complete internationalization for [application] supporting [languages]. Include translation management, locale detection, date/time formatting, number formatting, RTL language support, and translation workflow."

---

## 📦 Build & Bundle Optimization

### 72. Build System Configuration
👉 "Configure an optimized build system for [frontend framework] using [Vite/Webpack/Next.js]. Include code splitting, tree shaking, minification, asset optimization, and build performance improvements."

### 73. Dependency Management
👉 "Audit and optimize dependencies for [project]. Include security vulnerability scanning, outdated package identification, dependency size analysis, and strategies for reducing bundle size."
