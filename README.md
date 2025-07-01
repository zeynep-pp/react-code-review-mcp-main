# React & Next.js Code Review MCP

A Model Context Protocol (MCP) server that provides comprehensive code review and analysis for React and Next.js applications. This tool leverages ESLint with framework-specific rules to identify issues, suggest best practices, and ensure code quality.
A

## 🚀 Live Demo

[![Deploy with Vercel](./vercel_link.png)](https://react-code-review-mcp-main.vercel.app/)

**Try it live:** [https://react-code-review-mcp-main.vercel.app/](https://react-code-review-mcp-main.vercel.app/)

## Features

🔍 **Smart Framework Detection**
- Automatically detects React vs Next.js code patterns
- Supports JavaScript (.js, .jsx) and TypeScript (.ts, .tsx) files
- Intelligent file type detection for optimal analysis

⚡ **Comprehensive Analysis**
- React-specific linting rules and best practices
- Next.js framework-specific optimizations and rules
- Performance recommendations
- Security best practices
- Accessibility guidelines

🚀 **Advanced Capabilities**
- Redis caching for improved performance
- Detailed error and warning categorization
- Real-time code analysis
- Framework-specific recommendations

## Installation

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Redis (optional, for caching)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-nextjs-code-review-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration (Optional)**
   Create a `.env.local` file for Redis caching:
   ```env
   # For local Redis
   REDIS_URL=rediss://localhost:6379
   
   # For Upstash Redis (production)
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```

4. **Start the MCP server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## Usage

### Example Questions

You can ask the agent questions like:

- "Can you review this React component for code quality and best practices?"
- "Are there any issues in my Next.js page? Can you analyze the code?"
- "Does this code have any performance or security problems?"

#### Example Prompt

```
Can you review the following React component? Please list any errors and suggestions for improvement.

import React from 'react';

function MyButton() {
  return <button onClick={() => alert("Clicked!")}>Click me</button>;
}

export default MyButton;
```

### Cursor IDE Integration

This MCP server can be easily integrated with Cursor IDE to provide real-time React/Next.js code review capabilities directly in your editor.

#### Quick Setup for Cursor

1. **Generate Configuration**
   ```bash
   node scripts/generate-cursor-config.mjs
   ```

2. **Add to Cursor Settings**
   Copy one of the generated configurations to your Cursor settings:
   - **File → Preferences → Settings**
   - Search for "MCP" or go to the Claude section
   - Add the configuration JSON

#### Configuration Options

**Option 1: Direct SSE Connection (Recommended for Cursor 0.48.0+)**
```json
{
  "mcpServers": {
    "react-code-review": {
      "url": "https://react-code-review-mcp-main.vercel.app/sse"
    }
  }
}
```

**Option 2: Using server-everything proxy**
```json
{
  "mcpServers": {
    "react-code-review": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everything", "https://react-code-review-mcp-main.vercel.app/mcp"],
      "env": {}
    }
  }
}
```

**Option 3: Using mcp-client-cli**
```json
{
  "mcpServers": {
    "react-code-review": {
      "command": "npx",
      "args": ["-y", "mcp-client-cli", "https://react-code-review-mcp-main.vercel.app/sse"]
    }
  }
}
```

#### Using in Cursor

Once configured, you can:
- **Ask Claude to review your React/Next.js code** - Simply select code and ask "Can you review this React component?"
- **Get real-time feedback** - Paste code snippets and get instant analysis
- **Framework-specific suggestions** - Automatic detection of React vs Next.js patterns
- **Best practices enforcement** - ESLint rules tailored for React/Next.js

### MCP Tool Integration

The MCP server exposes a single tool called `react-nextjs-code-review` that can be used by MCP clients like Claude Desktop.

#### Tool Specification

**Name:** `react-nextjs-code-review`

**Description:** Analyze React and Next.js code and provide comprehensive code review feedback including lint errors, best practices, performance issues, and framework-specific recommendations.

**Parameters:**
- `code` (string): The React or Next.js code to review (supports .js, .jsx, .ts, .tsx files)

### Example Usage

#### Basic React Component Review

```javascript
// Input code
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default MyComponent;
```

**Analysis Result:**
```
React code analysis: 0 issue(s) found (0 errors, 0 warnings).
No issues found.
```

#### Next.js Component with Issues

```javascript
// Input code with issues
import { useRouter } from 'next/router';

function ProfilePage() {
  const router = useRouter();
  
  return (
    <div>
      <img src="/profile.jpg" alt="Profile" />
      <a href="/dashboard">Go to Dashboard</a>
    </div>
  );
}

export default ProfilePage;
```

**Analysis Result:**
```
Next.js code analysis: 2 issue(s) found (2 errors, 0 warnings).
Line 7, Col 7: [ERROR] Do not use the `<img>` element. Use `<Image />` from `next/image` instead. (@next/next/no-img-element)
Line 8, Col 7: [ERROR] Do not use `<a>` elements to navigate between pages. Use `<Link />` from `next/link` instead. (@next/next/no-html-link-for-pages)
```

#### TypeScript React Component

```typescript
// Input TypeScript code
interface Props {
  title: string;
  count?: number;
}

const Counter: React.FC<Props> = ({ title, count = 0 }) => {
  const [value, setValue] = useState<number>(count);
  
  return (
    <div>
      <h1>{title}</h1>
      <p>Current value: {value}</p>
      <button onClick={() => setValue(prev => prev + 1)}>
        Increment
      </button>
    </div>
  );
};

export default Counter;
```

## Supported Rules

### React Rules

- **react/jsx-uses-react**: Prevent React from being incorrectly marked as unused
- **react/jsx-uses-vars**: Prevent variables used in JSX from being marked as unused
- **react/jsx-key**: Require `key` prop for elements in arrays
- **react/no-array-index-key**: Prevent usage of array index as `key`
- **react/jsx-pascal-case**: Enforce PascalCase for user-defined JSX components
- **react/prop-types**: Require PropTypes definitions
- **react/no-unescaped-entities**: Prevent usage of unescaped entities

### Next.js Rules

- **@next/next/no-img-element**: Prevent usage of `<img>` in favor of `<Image />`
- **@next/next/no-html-link-for-pages**: Prevent usage of `<a>` for internal navigation
- **@next/next/no-head-import-in-document**: Prevent `next/head` import in `_document.js`
- **@next/next/no-script-component-in-head**: Prevent `<Script>` components in `<Head>`
- **@next/next/no-duplicate-head**: Prevent duplicate `<Head>` usage
- **@next/next/no-sync-scripts**: Prevent synchronous scripts
- **@next/next/no-css-tags**: Prevent manual stylesheet tags
- **@next/next/no-page-custom-font**: Warn about custom font loading

### General Best Practices

- **no-console**: Warn about console statements
- **no-debugger**: Prevent debugger statements
- **no-unused-vars**: Warn about unused variables
- **prefer-const**: Prefer const declarations
- **no-var**: Disallow var declarations

## Framework Detection

The tool automatically detects the framework based on code patterns:

### Next.js Detection Patterns

- Imports from `next/*` modules
- Usage of Next.js hooks (`useRouter`)
- Next.js API functions (`getServerSideProps`, `getStaticProps`, `getStaticPaths`)
- Next.js components (`Head`, `Image`, `Link`)

### TypeScript Detection Patterns

- Interface declarations
- Type annotations
- TypeScript-specific syntax
- React TypeScript patterns (`React.FC`, `Props>`)

## API Endpoints

### HTTP Transport
- **POST** `/http` - HTTP-based MCP communication
- **GET** `/http` - Health check

### Server-Sent Events (SSE)
- **GET** `/sse` - SSE-based MCP communication

### WebUI (Development)
- **GET** `/react-review` - Web interface for testing (development only)

## Configuration

### Redis Caching

The MCP server supports Redis caching for improved performance:

```javascript
// Automatic configuration based on environment
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  // Uses Upstash Redis (production)
} else if (process.env.REDIS_URL) {
  // Uses local Redis (development)
} else {
  // No caching (fallback)
}
```

### ESLint Configuration

The tool uses a dynamic ESLint configuration that adapts based on the detected framework:

```javascript
// React configuration
{
  plugins: ['react'],
  rules: { ...reactPlugin.configs.recommended.rules },
  settings: { react: { version: 'detect' } }
}

// Next.js configuration (additional)
{
  plugins: ['react', '@next/next'],
  rules: { 
    ...reactRules,
    '@next/next/no-img-element': 'error',
    '@next/next/no-html-link-for-pages': 'error'
  }
}
```

## Development

### Project Structure

```
├── app/
│   ├── [transport]/
│   │   └── route.ts          # MCP handler registration
│   └── react-review/
│       └── page.tsx          # Web UI for testing
├── tools/
│   ├── index.ts              # Tool exports
│   └── react-code-review.ts  # Main analysis tool
├── lib/
│   └── redis.ts              # Redis client configuration
├── scripts/
│   ├── test-client.mjs       # SSE testing script
│   └── test-streamable-http-client.mjs # HTTP testing script
└── package.json
```

### Running Tests

```bash
# Test SSE transport
npm run test:sse

# Test HTTP transport  
npm run test:http

# Start development server
npm run dev

# Build for production
npm run build
```

### Testing the Tool

You can test the tool using the provided scripts:

```bash
# Test with SSE transport
node scripts/test-client.mjs http://localhost:3000

# Test with HTTP transport
node scripts/test-streamable-http-client.mjs http://localhost:3000
```

## Troubleshooting

### Common Issues

1. **ESLint Plugin Errors**
   ```
   Error: Failed to load plugin '@next/next'
   ```
   **Solution:** Ensure `@next/eslint-plugin-next` is installed:
   ```bash
   npm install @next/eslint-plugin-next --save-dev
   ```

2. **Redis Connection Issues**
   ```
   Redis cache read failed: Error: ECONNREFUSED
   ```
   **Solution:** Redis is optional. The tool works without caching, or check your Redis configuration.

3. **TypeScript Errors**
   ```
   Could not find declaration file for module
   ```
   **Solution:** The tool includes necessary type ignores for ESLint plugins.

### Performance Tips

- **Enable Redis caching** for repeated analysis of similar code patterns
- **Use specific file extensions** in your code to help with framework detection
- **Include relevant imports** to help the tool identify the framework correctly

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or contributions, please:

1. Check the [troubleshooting section](#troubleshooting)
2. Search existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ for the React and Next.js community**

## 🚀 Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzeynep-pp%2Freact-code-review-mcp-main&env=REDIS_URL)

Click the button above for a one-click deploy to Vercel. This will automatically clone the repository and prompt you to set the required `REDIS_URL` environment variable.

---

## 🔑 Redis Configuration (Local & Vercel)

This MCP server supports Redis caching for improved performance. You can use either a local Redis instance (for development) or Upstash Redis (for production/Vercel deployments).

### Local Development

1. **Start a local Redis instance** (if you don't have one running):
   ```sh
   docker run -d --name redis-mcp -p 6379:6379 redis:latest
   ```
2. **Create a `.env.local` file** in your project root with:
   ```env
   REDIS_URL=redis://localhost:6379
   ```

### Vercel/Upstash (Production)

1. **Provision an Upstash Redis database** (https://upstash.com/).
2. **Copy your Upstash Redis connection string** (it will look like `rediss://default:YOUR_UPSTASH_PASSWORD@your-upstash-endpoint.upstash.io:6379`).
3. **Go to your project on [Vercel Dashboard](https://vercel.com/dashboard).**
4. **Select your project.**
5. **Navigate to the "Settings" tab, then "Environment Variables".**
6. **Add a new variable:**
   - **Key:** `REDIS_URL`
   - **Value:** your Upstash Redis connection string
   - **Environments:** Select Production, Preview, and Development as needed
7. **Click "Save" and redeploy your project.**

> **Note:**
> - Do not commit your `.env` files to git. Vercel will securely inject these environment variables at build and runtime.
> - The server will automatically detect and use the correct Redis configuration based on your environment.

---