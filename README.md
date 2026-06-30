# CorkSuite

CorkSuite is a unified operational workspace for teams that need their work, conversations, knowledge, decisions, and AI assistance to live in one coherent environment.

It is not designed as a bundle of separate tools. The goal is a single operational nexus where project management, tasks, communication, huddles, documents, notifications, identity, organizations, and AI features share the same context instead of forcing people to switch between disconnected applications.

## Vision

Modern teams lose momentum when every workflow lives in a different place. A project update sits in one tool, the decision that caused it sits in chat, the document that explains it sits elsewhere, and the people responsible for it are managed in yet another system.

CorkSuite aims to make that fragmentation disappear.

The product vision is a contextual workspace where every module understands the surrounding work:

- Projects know their tasks, documents, conversations, huddles, and decisions.
- Tasks can carry the full context of ownership, priority, discussion, files, and organizational permissions.
- Communication is tied to work instead of floating separately from it.
- Documents are part of operational flow, not a detached archive.
- Notifications point people toward meaningful action, not just activity.
- AI assists inside the workspace context, helping summarize, suggest, generate, and connect work across domains.

The long-term ambition is for CorkSuite to feel less like software people visit and more like the operating layer through which a team coordinates.

## Product Domains

CorkSuite is organized around business domains rather than technical layers:

- `auth` for authentication, sessions, and account entry points
- `workspace` for the shared operational surface
- `organizations` for organization switching, structure, and settings
- `identity` for users, roles, permissions, and access
- `projects` for project planning and execution
- `tasks` for assigned work and operational tracking
- `documents` for knowledge, files, and written context
- `chat` for contextual communication
- `huddles` for realtime collaboration and meetings
- `notifications` for activity and action routing
- `ai` for assistant workflows and intelligence features

Each domain is expected to own its own components, hooks, services, API adapters, schemas, types, utilities, stores, pages, and actions.

## Frontend Architecture

The frontend uses the Next.js App Router as a routing layer only. Route files should stay thin and delegate business behavior to domain modules.

The current architecture separates concerns like this:

- `app/` contains layouts, pages, route groups, loading states, and routing conventions.
- `modules/` contains domain-owned business code.
- `components/` contains shared UI primitives, layout pieces, navigation, feedback, forms, and data display components.
- `services/` contains centralized HTTP, API, authentication, and realtime infrastructure.
- `config/` contains routes, environment configuration, and feature flags.
- `types/` contains shared application and API types.
- `hooks/` contains reusable cross-domain React hooks.
- `store/` contains global client state.
- `lib/` contains low-level utilities.

This keeps the App Router focused on URL structure while the application grows through self-contained domains.

## Backend Relationship

The frontend is designed to communicate with the Django REST Framework backend in `../cork-api`.

The backend is the source of truth for identity, permissions, organizations, operational data, and realtime services. The frontend architecture prepares for REST APIs, JWT authentication, refresh tokens, protected routes, role-aware UI, organization switching, WebSocket communication, notifications, huddles, and future AI workflows.

## Current State

The repository currently contains the frontend foundation:

- Route groups for authentication and workspace areas
- Coming-soon pages for the initial product routes
- A shared application shell
- Domain module folders for future feature work
- Infrastructure placeholders for API, auth, environment, and realtime services

Feature screens are intentionally not built yet. The priority at this stage is a scalable structure that can support CorkSuite as a large enterprise application without turning into a collection of unrelated apps.
