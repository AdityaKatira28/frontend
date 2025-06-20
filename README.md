# SecureAI Frontend

A modular, scalable frontend application for the SecureAI Security Investment Platform. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🏗️ Architecture

This frontend follows a modular architecture pattern designed to scale from 3 to 8+ applications seamlessly.

### Directory Structure

```
src/
├── apps/                          # Individual applications
│   ├── overview/                  # Security overview dashboard
│   ├── threat-intelligence/       # Real-time threat monitoring
│   ├── budget-optimization/       # Security investment optimization
│   ├── incident-response/         # Security incident management (future)
│   ├── compliance/                # Regulatory compliance tracking (future)
│   ├── asset-management/          # Security asset inventory (future)
│   ├── reporting/                 # Security reports and analytics (future)
│   └── settings/                  # Application configuration (future)
├── shared/                        # Shared components and utilities
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # Base UI components (shadcn/ui)
│   │   ├── layout/                # Layout components
│   │   ├── cards/                 # Card components
│   │   ├── charts/                # Chart components
│   │   └── visualizations/        # Data visualization components
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   ├── types/                     # TypeScript type definitions
│   └── constants/                 # Application constants
├── core/                          # Core application logic
│   ├── api/                       # API client and services
│   ├── auth/                      # Authentication logic
│   ├── services/                  # Business logic services
│   ├── storage/                   # Local storage utilities
│   └── validation/                # Form validation schemas
└── config/                        # Configuration files
    ├── environments/              # Environment-specific configs
    └── routes/                    # Routing configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+ or bun

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun dev
```

### Building

```bash
# Build for production
npm run build
# or
bun run build

# Build for development
npm run build:dev
# or
bun run build:dev
```

## 🔧 Configuration

### Environment Variables

The application supports multiple environments:

- **Development**: `http://localhost:3000`
- **Staging**: `https://staging-api.secureai.com`
- **Production**: `https://backend-production-6b38.up.railway.app`

Environment configuration is managed in `src/config/environments/index.ts`.

### API Integration

The frontend connects to the SecureAI backend hosted on Railway:
- **Production API**: `https://backend-production-6b38.up.railway.app`

API client configuration is in `src/core/api/client.ts`.

## 📱 Applications

### Current Applications

1. **Overview** (`/`)
   - Security dashboard overview
   - Real-time metrics and KPIs
   - Recent alerts and notifications

2. **Threat Intelligence** (`/threat-intelligence`)
   - Real-time threat monitoring
   - Global threat map visualization
   - Threat timeline analysis

3. **Budget Optimization** (`/budget-optimization`)
   - AI-powered security investment recommendations
   - Threat-driven budget allocation
   - ROI analysis and scenario planning

### Future Applications

- **Incident Response** - Security incident management
- **Compliance** - Regulatory compliance tracking
- **Asset Management** - Security asset inventory
- **Reporting** - Security reports and analytics
- **Settings** - Application configuration

## 🎨 UI Components

The application uses a comprehensive design system built on:

- **shadcn/ui** - Base UI components
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Recharts** - Chart components

### Component Categories

- **Layout Components**: AppLayout, Sidebar, Header, AIAssistant
- **Data Visualization**: Charts, Maps, Metrics Grid
- **Cards**: Security Score, Alert Cards, Metric Cards
- **Forms**: Inputs, Buttons, Tabs, Sliders

## 🔌 API Integration

### Core Services

- **API Client** (`src/core/api/client.ts`)
  - Centralized HTTP client
  - Authentication handling
  - Error management
  - Request/response interceptors

- **Business Services** (`src/core/services/`)
  - Threat analysis
  - Budget optimization
  - Query processing
  - Real-time alerts

### Data Flow

1. **API Client** → Makes HTTP requests to backend
2. **Services** → Process business logic
3. **Hooks** → Manage state and side effects
4. **Components** → Render UI and handle user interactions

## 🧪 Testing

```bash
# Run tests
npm test
# or
bun test

# Run tests with UI
npm run test:ui
# or
bun run test:ui

# Run tests with coverage
npm run test:coverage
# or
bun run test:coverage
```

## 📦 Build & Deployment

### Development Build

```bash
npm run build:dev
```

### Production Build

```bash
npm run build:prod
```

### Preview Build

```bash
npm run preview
```

## 🔍 Code Quality

### Linting

```bash
# Run linter
npm run lint
# or
bun run lint

# Fix linting issues
npm run lint:fix
# or
bun run lint:fix
```

### Type Checking

```bash
npm run type-check
# or
bun run type-check
```

## 🚀 Adding New Applications

To add a new application:

1. **Create app directory**:
   ```bash
   mkdir src/apps/your-app-name
   ```

2. **Create main component**:
   ```typescript
   // src/apps/your-app-name/YourApp.tsx
   import React from 'react';
   
   export const YourApp = () => {
     return (
       <div>
         <h1>Your App</h1>
       </div>
     );
   };
   ```

3. **Add route configuration** in `src/config/routes/index.ts`:
   ```typescript
   {
     id: 'your-app',
     path: ROUTES.YOUR_APP,
     label: 'Your App',
     description: 'Your app description',
     icon: 'YourIcon',
     enabled: true,
   }
   ```

4. **Add route** in `src/App.tsx`:
   ```typescript
   <Route path="your-app" element={<YourApp />} />
   ```

## 🤝 Contributing

1. Follow the modular architecture pattern
2. Use shared components when possible
3. Add proper TypeScript types
4. Include error handling
5. Write tests for new features
6. Update documentation

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the SecureAI Team**
