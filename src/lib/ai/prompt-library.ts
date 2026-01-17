export interface PromptVariable {
    id: string;
    name: string;
    type: 'text' | 'code' | 'select' | 'multiline';
    placeholder: string;
    options?: string[]; // For select type
    required?: boolean;
}

export interface PromptTemplate {
    id: string;
    title: string;
    category: string;
    icon: string;
    template: string;
    tags: string[];
    variables?: PromptVariable[];
    technique?: 'zero-shot' | 'few-shot' | 'chain-of-thought' | 'react' | 'standard';
    outputFormat?: 'markdown' | 'json' | 'code' | 'list' | 'free';
}

export const PROMPT_CATEGORIES = [
    { id: 'all', name: 'All Prompts', icon: '📚' },
    { id: 'frontend', name: 'Frontend', icon: '⚛️' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'devops', name: 'DevOps', icon: '🚀' },
    { id: 'testing', name: 'Testing', icon: '🧪' },
    { id: 'documentation', name: 'Documentation', icon: '📝' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' },
    { id: 'architecture', name: 'Architecture', icon: '🏗️' },
    { id: 'advanced', name: 'Advanced Techniques', icon: '💎' },
];

export const PROMPT_LIBRARY: PromptTemplate[] = [
    // ==================== ADVANCED PROMPTING TECHNIQUES ====================
    {
        id: 'cot_debug',
        title: 'Chain-of-Thought Debugging',
        category: 'advanced',
        icon: '🧠',
        technique: 'chain-of-thought',
        outputFormat: 'markdown',
        template: `I need you to debug the following issue using step-by-step reasoning.

**Problem Description:**
{{PROBLEM}}

**Code with Issue:**
\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

**Instructions:**
Let's think through this step by step:
1. First, identify what the code is supposed to do
2. Trace through the execution path
3. Identify where the behavior deviates from expectations
4. Explain the root cause
5. Provide a corrected version with explanation`,
        tags: ['debugging', 'chain-of-thought', 'reasoning'],
        variables: [
            { id: 'PROBLEM', name: 'Problem Description', type: 'multiline', placeholder: 'Describe the bug or unexpected behavior...', required: true },
            { id: 'LANGUAGE', name: 'Language', type: 'select', placeholder: 'Select language', options: ['typescript', 'javascript', 'python', 'go', 'rust', 'java'], required: true },
            { id: 'CODE', name: 'Code', type: 'code', placeholder: 'Paste your code here...', required: true },
        ],
    },
    {
        id: 'react_pattern',
        title: 'ReAct: Reason + Act Pattern',
        category: 'advanced',
        icon: '⚡',
        technique: 'react',
        outputFormat: 'markdown',
        template: `You are an expert developer. Use the ReAct pattern to solve this task.

**Task:** {{TASK}}

For each step:
1. **Thought**: Reason about what you need to do next
2. **Action**: Describe the specific action you'll take
3. **Observation**: Note what you learned from the action

Continue this loop until the task is complete. Then provide your final solution.

---

**Begin ReAct Loop:**`,
        tags: ['react', 'reasoning', 'advanced'],
        variables: [
            { id: 'TASK', name: 'Task Description', type: 'multiline', placeholder: 'Describe the task to solve...', required: true },
        ],
    },
    {
        id: 'few_shot_convert',
        title: 'Few-Shot Code Conversion',
        category: 'advanced',
        icon: '📖',
        technique: 'few-shot',
        outputFormat: 'code',
        template: `Convert the following code from {{SOURCE_LANG}} to {{TARGET_LANG}}.

**Examples:**

Example 1 - {{SOURCE_LANG}}:
\`\`\`{{SOURCE_LANG}}
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

Example 1 - {{TARGET_LANG}}:
\`\`\`{{TARGET_LANG}}
def greet(name: str) -> str:
    return f"Hello, {name}"
\`\`\`

Example 2 - {{SOURCE_LANG}}:
\`\`\`{{SOURCE_LANG}}
const users = data.filter(u => u.active).map(u => u.name);
\`\`\`

Example 2 - {{TARGET_LANG}}:
\`\`\`{{TARGET_LANG}}
users = [u.name for u in data if u.active]
\`\`\`

---

**Now convert this code:**

\`\`\`{{SOURCE_LANG}}
{{CODE}}
\`\`\`

Provide only the converted code with brief comments explaining key differences.`,
        tags: ['conversion', 'few-shot', 'languages'],
        variables: [
            { id: 'SOURCE_LANG', name: 'Source Language', type: 'select', placeholder: 'From', options: ['javascript', 'typescript', 'python', 'java', 'go', 'rust', 'c#'], required: true },
            { id: 'TARGET_LANG', name: 'Target Language', type: 'select', placeholder: 'To', options: ['javascript', 'typescript', 'python', 'java', 'go', 'rust', 'c#'], required: true },
            { id: 'CODE', name: 'Code to Convert', type: 'code', placeholder: 'Paste code to convert...', required: true },
        ],
    },
    {
        id: 'self_critique',
        title: 'Self-Critique & Improve',
        category: 'advanced',
        icon: '🔄',
        technique: 'chain-of-thought',
        outputFormat: 'markdown',
        template: `Analyze and improve the following code through self-critique.

**Code:**
\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

**Process:**
1. **Initial Assessment**: What does this code do well?
2. **Critique**: Identify 3-5 specific issues (performance, readability, security, maintainability)
3. **Counter-Critique**: For each issue, consider if the original approach has merits
4. **Final Decision**: Decide which improvements to keep
5. **Improved Code**: Provide the refactored version

Be thorough and explain your reasoning at each step.`,
        tags: ['refactoring', 'self-critique', 'improvement'],
        variables: [
            { id: 'LANGUAGE', name: 'Language', type: 'select', placeholder: 'Select', options: ['typescript', 'javascript', 'python', 'go', 'rust'], required: true },
            { id: 'CODE', name: 'Code', type: 'code', placeholder: 'Paste code to critique...', required: true },
        ],
    },

    // ==================== FRONTEND ====================
    {
        id: 'refactor_react',
        title: 'Refactor React Component',
        category: 'frontend',
        icon: '⚛️',
        technique: 'standard',
        outputFormat: 'code',
        template: `Refactor the following React component for better performance, readability, and modern best practices.

**Focus Areas:** {{FOCUS_AREAS}}

\`\`\`tsx
{{CODE}}
\`\`\`

Consider: hooks, memoization, clean code, TypeScript improvements, and accessibility.`,
        tags: ['react', 'refactoring', 'performance'],
        variables: [
            { id: 'FOCUS_AREAS', name: 'Focus Areas', type: 'select', placeholder: 'Select focus', options: ['Performance', 'Readability', 'TypeScript', 'Accessibility', 'All'], required: false },
            { id: 'CODE', name: 'Component Code', type: 'code', placeholder: 'Paste your React component...', required: true },
        ],
    },
    {
        id: 'react_hooks',
        title: 'Create Custom React Hook',
        category: 'frontend',
        icon: '🪝',
        technique: 'standard',
        outputFormat: 'code',
        template: `Create a custom React hook that handles: {{FUNCTIONALITY}}

**Requirements:**
- Full TypeScript types
- Error handling
- Cleanup on unmount
- Loading state
- Memoization where appropriate

Provide the hook implementation and an example usage.`,
        tags: ['react', 'hooks', 'typescript'],
        variables: [
            { id: 'FUNCTIONALITY', name: 'Functionality', type: 'multiline', placeholder: 'Describe what the hook should do...', required: true },
        ],
    },
    {
        id: 'nextjs_api',
        title: 'Next.js API Route (App Router)',
        category: 'frontend',
        icon: '▲',
        technique: 'standard',
        outputFormat: 'code',
        template: `Create a Next.js App Router API route for: {{ENDPOINT_PURPOSE}}

**Method:** {{METHOD}}
**Features needed:** {{FEATURES}}

Include: TypeScript types, error handling, input validation, and proper HTTP status codes.`,
        tags: ['nextjs', 'api', 'app-router'],
        variables: [
            { id: 'ENDPOINT_PURPOSE', name: 'Endpoint Purpose', type: 'text', placeholder: 'e.g., User authentication', required: true },
            { id: 'METHOD', name: 'HTTP Method', type: 'select', placeholder: 'Method', options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], required: true },
            { id: 'FEATURES', name: 'Features', type: 'multiline', placeholder: 'List required features...', required: false },
        ],
    },
    {
        id: 'css_to_tailwind',
        title: 'CSS to Tailwind Conversion',
        category: 'frontend',
        icon: '🎨',
        technique: 'standard',
        outputFormat: 'code',
        template: `Convert the following CSS to Tailwind CSS classes. Prioritize utility classes and maintain responsive design.

\`\`\`css
{{CSS_CODE}}
\`\`\`

Provide the equivalent Tailwind classes with explanation of any non-obvious conversions.`,
        tags: ['css', 'tailwind', 'conversion'],
        variables: [
            { id: 'CSS_CODE', name: 'CSS Code', type: 'code', placeholder: 'Paste your CSS...', required: true },
        ],
    },
    {
        id: 'accessibility_audit',
        title: 'Accessibility Audit (WCAG)',
        category: 'frontend',
        icon: '♿',
        technique: 'chain-of-thought',
        outputFormat: 'markdown',
        template: `Perform a WCAG 2.1 AA accessibility audit on this component.

\`\`\`tsx
{{CODE}}
\`\`\`

**Audit Process:**
1. Check semantic HTML usage
2. Verify ARIA attributes
3. Test keyboard navigation flow
4. Validate color contrast
5. Check screen reader compatibility
6. Review focus management

For each issue found, provide the fix.`,
        tags: ['accessibility', 'wcag', 'a11y'],
        variables: [
            { id: 'CODE', name: 'Component', type: 'code', placeholder: 'Paste component to audit...', required: true },
        ],
    },

    // ==================== BACKEND ====================
    {
        id: 'api_endpoint',
        title: 'Design REST API Endpoint',
        category: 'backend',
        icon: '🔌',
        technique: 'standard',
        outputFormat: 'markdown',
        template: `Design a RESTful API endpoint for: {{REQUIREMENT}}

**Framework:** {{FRAMEWORK}}

Include:
- Request/response TypeScript interfaces
- Route handler implementation
- Input validation (Zod)
- Error handling
- Example curl command`,
        tags: ['api', 'rest', 'design'],
        variables: [
            { id: 'REQUIREMENT', name: 'Requirement', type: 'multiline', placeholder: 'Describe API requirement...', required: true },
            { id: 'FRAMEWORK', name: 'Framework', type: 'select', placeholder: 'Select', options: ['Express', 'Fastify', 'Hono', 'Next.js', 'Astro'], required: true },
        ],
    },
    {
        id: 'drizzle_schema',
        title: 'Drizzle ORM Schema',
        category: 'backend',
        icon: '🗃️',
        technique: 'standard',
        outputFormat: 'code',
        template: `Create a Drizzle ORM schema for: {{ENTITY_DESCRIPTION}}

**Database:** {{DATABASE}}
**Relations needed:** {{RELATIONS}}

Include: proper column types, constraints, indexes, and relations.`,
        tags: ['drizzle', 'orm', 'database'],
        variables: [
            { id: 'ENTITY_DESCRIPTION', name: 'Entity Description', type: 'multiline', placeholder: 'Describe the entity/table...', required: true },
            { id: 'DATABASE', name: 'Database', type: 'select', placeholder: 'Select', options: ['PostgreSQL', 'MySQL', 'SQLite', 'Turso'], required: true },
            { id: 'RELATIONS', name: 'Relations', type: 'text', placeholder: 'e.g., has many posts, belongs to org', required: false },
        ],
    },
    {
        id: 'error_handling',
        title: 'Implement Error Handling',
        category: 'backend',
        icon: '🚨',
        technique: 'standard',
        outputFormat: 'code',
        template: `Add robust error handling to this code:

\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

Include: custom error classes, structured logging, graceful degradation, and proper error propagation.`,
        tags: ['error-handling', 'logging', 'resilience'],
        variables: [
            { id: 'LANGUAGE', name: 'Language', type: 'select', placeholder: 'Select', options: ['typescript', 'javascript', 'python', 'go'], required: true },
            { id: 'CODE', name: 'Code', type: 'code', placeholder: 'Paste code to add error handling...', required: true },
        ],
    },

    // ==================== DATABASE ====================
    {
        id: 'sql_optimization',
        title: 'Optimize SQL Query',
        category: 'database',
        icon: '⚡',
        technique: 'chain-of-thought',
        outputFormat: 'markdown',
        template: `Analyze and optimize this SQL query:

\`\`\`sql
{{QUERY}}
\`\`\`

**Analysis Steps:**
1. Identify query patterns and scan types
2. Check for N+1 query potential
3. Recommend indexes
4. Suggest query rewrites
5. Provide optimized version with EXPLAIN analysis tips`,
        tags: ['sql', 'optimization', 'performance'],
        variables: [
            { id: 'QUERY', name: 'SQL Query', type: 'code', placeholder: 'Paste SQL query...', required: true },
        ],
    },
    {
        id: 'schema_design',
        title: 'Database Schema Design',
        category: 'database',
        icon: '📊',
        technique: 'standard',
        outputFormat: 'markdown',
        template: `Design a normalized database schema for: {{REQUIREMENTS}}

Include:
- Tables with columns and types
- Primary and foreign keys
- Indexes for common queries
- Mermaid ER diagram
- Sample seed data SQL`,
        tags: ['schema', 'design', 'normalization'],
        variables: [
            { id: 'REQUIREMENTS', name: 'Requirements', type: 'multiline', placeholder: 'Describe data requirements...', required: true },
        ],
    },

    // ==================== TESTING ====================
    {
        id: 'unit_test_node',
        title: 'Generate Unit Tests (Jest/Vitest)',
        category: 'testing',
        icon: '🧪',
        technique: 'standard',
        outputFormat: 'code',
        template: `Generate comprehensive unit tests for this function:

\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

**Test Framework:** {{FRAMEWORK}}

Include: happy path, edge cases, error scenarios, async handling, and aim for 100% coverage.`,
        tags: ['testing', 'jest', 'vitest', 'unit-tests'],
        variables: [
            { id: 'LANGUAGE', name: 'Language', type: 'select', placeholder: 'Select', options: ['typescript', 'javascript'], required: true },
            { id: 'FRAMEWORK', name: 'Framework', type: 'select', placeholder: 'Select', options: ['Jest', 'Vitest', 'Node Test Runner'], required: true },
            { id: 'CODE', name: 'Code to Test', type: 'code', placeholder: 'Paste function to test...', required: true },
        ],
    },
    {
        id: 'e2e_playwright',
        title: 'Playwright E2E Test',
        category: 'testing',
        icon: '🎭',
        technique: 'standard',
        outputFormat: 'code',
        template: `Create a Playwright E2E test for: {{TEST_SCENARIO}}

**Base URL:** {{BASE_URL}}
**Key interactions:** {{INTERACTIONS}}

Include: page object pattern, assertions, screenshot on failure, and mobile viewport test.`,
        tags: ['playwright', 'e2e', 'testing'],
        variables: [
            { id: 'TEST_SCENARIO', name: 'Test Scenario', type: 'text', placeholder: 'e.g., User login flow', required: true },
            { id: 'BASE_URL', name: 'Base URL', type: 'text', placeholder: 'http://localhost:3000', required: false },
            { id: 'INTERACTIONS', name: 'Key Interactions', type: 'multiline', placeholder: 'List user interactions...', required: true },
        ],
    },

    // ==================== DEVOPS ====================
    {
        id: 'dockerfile',
        title: 'Create Dockerfile',
        category: 'devops',
        icon: '🐳',
        technique: 'standard',
        outputFormat: 'code',
        template: `Create an optimized, multi-stage Dockerfile for: {{APPLICATION}}

**Runtime:** {{RUNTIME}}
**Features:** Production build, minimal image size, security best practices, health check.`,
        tags: ['docker', 'containerization', 'deployment'],
        variables: [
            { id: 'APPLICATION', name: 'Application Type', type: 'text', placeholder: 'e.g., Next.js app with Prisma', required: true },
            { id: 'RUNTIME', name: 'Runtime', type: 'select', placeholder: 'Select', options: ['Node 20', 'Node 22', 'Bun', 'Python 3.12', 'Go 1.22'], required: true },
        ],
    },
    {
        id: 'github_actions',
        title: 'GitHub Actions Pipeline',
        category: 'devops',
        icon: '🔧',
        technique: 'standard',
        outputFormat: 'code',
        template: `Create a GitHub Actions CI/CD pipeline for: {{PROJECT_TYPE}}

**Trigger:** {{TRIGGER}}
**Stages needed:** {{STAGES}}

Include: caching, matrix builds if applicable, secrets handling, and deployment step.`,
        tags: ['ci-cd', 'github-actions', 'automation'],
        variables: [
            { id: 'PROJECT_TYPE', name: 'Project Type', type: 'text', placeholder: 'e.g., Next.js deployed to Vercel', required: true },
            { id: 'TRIGGER', name: 'Trigger', type: 'select', placeholder: 'Select', options: ['push to main', 'pull request', 'manual dispatch', 'scheduled'], required: true },
            { id: 'STAGES', name: 'Stages', type: 'multiline', placeholder: 'e.g., lint, test, build, deploy', required: true },
        ],
    },

    // ==================== SECURITY ====================
    {
        id: 'security_review',
        title: 'Security Code Review',
        category: 'security',
        icon: '🔐',
        technique: 'chain-of-thought',
        outputFormat: 'markdown',
        template: `Perform a security review of this code:

\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

**Security Checklist:**
1. Injection vulnerabilities (SQL, XSS, Command)
2. Authentication/Authorization flaws
3. Sensitive data exposure
4. Security misconfigurations
5. Broken access control
6. Cryptographic failures

For each finding: severity, explanation, and fix.`,
        tags: ['security', 'vulnerabilities', 'review'],
        variables: [
            { id: 'LANGUAGE', name: 'Language', type: 'select', placeholder: 'Select', options: ['typescript', 'javascript', 'python', 'java', 'go'], required: true },
            { id: 'CODE', name: 'Code', type: 'code', placeholder: 'Paste code for security review...', required: true },
        ],
    },
    {
        id: 'auth_implementation',
        title: 'Authentication Flow Design',
        category: 'security',
        icon: '🛡️',
        technique: 'standard',
        outputFormat: 'markdown',
        template: `Design a secure authentication flow for: {{REQUIREMENTS}}

**Auth Method:** {{AUTH_METHOD}}
**Include:** session management, token refresh, CSRF protection, rate limiting.`,
        tags: ['auth', 'jwt', 'oauth'],
        variables: [
            { id: 'REQUIREMENTS', name: 'Requirements', type: 'multiline', placeholder: 'Describe auth requirements...', required: true },
            { id: 'AUTH_METHOD', name: 'Auth Method', type: 'select', placeholder: 'Select', options: ['JWT', 'Session-based', 'OAuth 2.0', 'Passkeys/WebAuthn'], required: true },
        ],
    },

    // ==================== DOCUMENTATION ====================
    {
        id: 'architecture_doc',
        title: 'Architecture Document',
        category: 'documentation',
        icon: '🏗️',
        technique: 'standard',
        outputFormat: 'markdown',
        template: `Create a high-level architecture document for: {{SYSTEM}}

Include:
- System overview
- Component diagram (Mermaid)
- Data flow diagram
- Technology stack justification
- Scalability considerations`,
        tags: ['architecture', 'documentation', 'design'],
        variables: [
            { id: 'SYSTEM', name: 'System Description', type: 'multiline', placeholder: 'Describe the system...', required: true },
        ],
    },
    {
        id: 'api_documentation',
        title: 'API Documentation (OpenAPI)',
        category: 'documentation',
        icon: '📖',
        technique: 'standard',
        outputFormat: 'code',
        template: `Generate OpenAPI 3.0 documentation for these endpoints:

{{ENDPOINTS}}

Include: descriptions, request/response schemas, example values, and error responses.`,
        tags: ['api-docs', 'openapi', 'swagger'],
        variables: [
            { id: 'ENDPOINTS', name: 'Endpoints', type: 'multiline', placeholder: 'List your API endpoints...', required: true },
        ],
    },
    {
        id: 'readme_generator',
        title: 'Generate README.md',
        category: 'documentation',
        icon: '📄',
        technique: 'standard',
        outputFormat: 'markdown',
        template: `Generate a professional README.md for: {{PROJECT}}

**Tech Stack:** {{TECH_STACK}}
**Type:** {{PROJECT_TYPE}}

Include: badges, features, installation, usage, configuration, contributing guide, and license section.`,
        tags: ['readme', 'documentation', 'open-source'],
        variables: [
            { id: 'PROJECT', name: 'Project Name', type: 'text', placeholder: 'e.g., MyAwesomeApp', required: true },
            { id: 'TECH_STACK', name: 'Tech Stack', type: 'text', placeholder: 'e.g., Next.js, Prisma, Tailwind', required: true },
            { id: 'PROJECT_TYPE', name: 'Type', type: 'select', placeholder: 'Select', options: ['Library', 'CLI Tool', 'Web App', 'API', 'Full-Stack'], required: true },
        ],
    },

    // ==================== AI/ML ====================
    {
        id: 'prompt_engineering',
        title: 'Optimize AI Prompt',
        category: 'ai',
        icon: '✨',
        technique: 'chain-of-thought',
        outputFormat: 'markdown',
        template: `Optimize this AI prompt for better results:

**Original Prompt:**
{{PROMPT}}

**Target Model:** {{MODEL}}

**Optimization Process:**
1. Analyze current prompt structure
2. Identify vague or ambiguous parts
3. Apply prompting best practices (role, context, format, examples)
4. Add output constraints
5. Provide optimized version with explanation of changes`,
        tags: ['prompt-engineering', 'llm', 'optimization'],
        variables: [
            { id: 'PROMPT', name: 'Original Prompt', type: 'multiline', placeholder: 'Paste original prompt...', required: true },
            { id: 'MODEL', name: 'Target Model', type: 'select', placeholder: 'Select', options: ['GPT-4', 'Claude 3.5', 'Gemini Pro', 'Open-source (Llama/Mistral)'], required: true },
        ],
    },
    {
        id: 'ai_integration',
        title: 'AI API Integration',
        category: 'ai',
        icon: '🧠',
        technique: 'standard',
        outputFormat: 'code',
        template: `Create an integration with {{AI_SERVICE}}:

**Features needed:** {{FEATURES}}
**Framework:** {{FRAMEWORK}}

Include: TypeScript types, error handling, rate limiting, and streaming support if applicable.`,
        tags: ['openai', 'anthropic', 'integration'],
        variables: [
            { id: 'AI_SERVICE', name: 'AI Service', type: 'select', placeholder: 'Select', options: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Replicate', 'Together AI'], required: true },
            { id: 'FEATURES', name: 'Features', type: 'multiline', placeholder: 'e.g., chat completion, embeddings, streaming', required: true },
            { id: 'FRAMEWORK', name: 'Framework', type: 'select', placeholder: 'Select', options: ['Vanilla TypeScript', 'Next.js', 'Astro', 'Express'], required: false },
        ],
    },

    // ==================== ARCHITECTURE ====================
    {
        id: 'system_design',
        title: 'System Design Interview',
        category: 'architecture',
        icon: '🎯',
        technique: 'chain-of-thought',
        outputFormat: 'markdown',
        template: `Walk me through a system design for: {{SYSTEM}}

**Scale:** {{SCALE}}
**Focus Areas:** {{FOCUS}}

Use a structured approach:
1. Requirements clarification
2. API design
3. High-level architecture
4. Deep dive into components
5. Scale and tradeoffs discussion`,
        tags: ['system-design', 'interview', 'architecture'],
        variables: [
            { id: 'SYSTEM', name: 'System to Design', type: 'text', placeholder: 'e.g., URL shortener, Twitter clone', required: true },
            { id: 'SCALE', name: 'Scale', type: 'select', placeholder: 'Select', options: ['Startup (10K users)', 'Growing (1M users)', 'Enterprise (100M+ users)'], required: true },
            { id: 'FOCUS', name: 'Focus Areas', type: 'text', placeholder: 'e.g., real-time, consistency, availability', required: false },
        ],
    },
    {
        id: 'microservices_split',
        title: 'Microservices Decomposition',
        category: 'architecture',
        icon: '🔀',
        technique: 'chain-of-thought',
        outputFormat: 'markdown',
        template: `Help me decompose this monolith into microservices:

**Current System:**
{{SYSTEM_DESCRIPTION}}

**Analysis:**
1. Identify bounded contexts
2. Define service boundaries
3. Plan data ownership
4. Design communication patterns (sync/async)
5. Migration strategy`,
        tags: ['microservices', 'decomposition', 'migration'],
        variables: [
            { id: 'SYSTEM_DESCRIPTION', name: 'System Description', type: 'multiline', placeholder: 'Describe current monolith...', required: true },
        ],
    },
];
