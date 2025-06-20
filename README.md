# CyberWise AI Advisor 2.0

> **Modular Security Investment Platform** - AI-powered threat analysis and budget optimization

## 🚀 Overview

CyberWise AI Advisor is a comprehensive security investment platform that provides real-time threat intelligence, budget optimization, and security posture analysis. The platform has been transformed into a modular architecture supporting multiple specialized applications.

## 🏗️ Architecture

### Modular App Structure
- **Overview Dashboard** - Security metrics and real-time monitoring
- **Threat Intelligence** - AI-powered threat analysis and global monitoring  
- **Budget Optimization** - Threat-driven security investment recommendations
- **Compliance Tracker** - Real-time compliance monitoring and AI insights

### Future Applications (Planned)
- Vulnerability Scanner
- Incident Response
- Security Training
- Reporting Analytics

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Routing**: React Router v6
- **State Management**: React Query
- **Backend**: Railway (https://backend-production-6b38.up.railway.app)
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── apps/                    # Individual applications
│   ├── overview/           # Overview Dashboard
│   ├── threat-intelligence/ # Threat Intelligence
│   ├── budget-optimization/ # Budget Optimization
│   └── compliance-tracker/ # Compliance Tracker
├── shared/                 # Shared components & utilities
│   ├── components/         # Reusable UI components
│   ├── services/          # API clients & services
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript definitions
├── layout/                # Layout components
├── routes/                # Routing configuration
├── config/                # App configuration
└── assets/                # Static assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdityaKatira28/cyberwise-ai-advisor02.git
   cd cyberwise-ai-advisor02
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Features

### Overview Dashboard (`/overview`)
- **Security Metrics**: Real-time security score and KPIs
- **Threat Landscape**: Visual threat severity analysis
- **Budget Allocation**: Current security investment breakdown
- **Recent Alerts**: Latest security incidents and notifications

### Threat Intelligence (`/threat-intelligence`)
- **Active Threats**: Real-time threat monitoring (23 active)
- **Global Coverage**: Worldwide threat tracking (47 countries)
- **Threat Timeline**: Historical threat activity analysis
- **Threat Map**: Interactive global threat visualization

### Budget Optimization (`/budget-optimization`)
- **AI-Powered Allocation**: Threat-driven budget recommendations
- **Scenario Analysis**: Budget impact modeling
- **AI Query Interface**: Natural language budget insights
- **ROI Analysis**: Investment return calculations

### Compliance Tracker (`/compliance-tracker`)
- **Real-time Monitoring**: Live compliance status across frameworks
- **Framework Scores**: SOC2, GDPR, HIPAA, PCI-DSS, ISO27001 tracking
- **Provider Statistics**: Multi-cloud compliance monitoring (AWS, Azure, GCP)
- **AI Insights**: Automated violation detection and recommendations
- **Recent Violations**: Latest compliance issues with risk scoring

## 🔧 Configuration

### Environment Variables
```typescript
// src/config/environment.ts
export const ENV = {
  API_BASE_URL: 'https://backend-production-6b38.up.railway.app',
  API_TIMEOUT: 10000,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD
};
```

### App Registry
```typescript
// src/config/apps.ts
export const APP_REGISTRY = [
  {
    id: 'overview',
    name: 'Overview',
    path: '/overview',
    icon: BarChart3,
    description: 'System overview and dashboard'
  },
  // ... other apps
];
```

## 🧩 Adding New Applications

1. **Create app structure**
   ```bash
   mkdir -p src/apps/new-app/{components,pages,services,hooks,types,utils}
   ```

2. **Add to app registry**
   ```typescript
   // src/config/apps.ts
   {
     id: 'new-app',
     name: 'New App',
     path: '/new-app',
     icon: YourIcon,
     description: 'App description'
   }
   ```

3. **Create app entry point**
   ```typescript
   // src/apps/new-app/index.tsx
   const NewApp = () => (
     <Routes>
       <Route path="/" element={<MainPage />} />
     </Routes>
   );
   ```

4. **Add route**
   ```typescript
   // src/routes/AppRoutes.tsx
   <Route path="/new-app/*" element={<NewApp />} />
   ```

## 🔌 API Integration

### Railway Backend
The platform integrates with a Railway-hosted backend for:
- Threat data analysis
- Budget optimization algorithms
- User authentication
- Real-time security metrics

### API Client
```typescript
// src/shared/services/api.ts
export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT
});
```

## 🎨 UI Components

Built with **shadcn/ui** components:
- Cards, Buttons, Inputs
- Charts and Visualizations  
- Tables and Data Display
- Navigation and Layout
- Forms and Validation

## 📊 Data Visualization

- **Recharts**: Interactive charts and graphs
- **Custom Visualizations**: Threat maps and security metrics
- **Real-time Updates**: Live data streaming
- **Responsive Design**: Mobile and desktop optimized

## 🔒 Security Features

- **Authentication**: JWT-based user authentication
- **Authorization**: Role-based access control
- **API Security**: Request/response interceptors
- **Data Validation**: Input sanitization and validation

## 🚀 Performance

- **Code Splitting**: App-based lazy loading
- **Bundle Optimization**: Vite build optimization
- **Caching**: API response caching
- **Hot Reload**: Fast development experience

## 📱 Responsive Design

- **Mobile First**: Optimized for all screen sizes
- **Touch Support**: Mobile-friendly interactions
- **Progressive Enhancement**: Graceful degradation

## 🧪 Testing

```bash
# Run tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📈 Monitoring

- **Error Tracking**: Built-in error boundaries
- **Performance Metrics**: Core Web Vitals tracking
- **User Analytics**: Usage pattern analysis

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: See [TRANSFORMATION_GUIDE.md](TRANSFORMATION_GUIDE.md)
- **Issues**: GitHub Issues
- **Email**: support@cyberwise.ai

## 🎯 Roadmap

### Phase 1 (Completed) ✅
- [x] Modular architecture transformation
- [x] Four core applications (Overview, Threat Intelligence, Budget Optimization, Compliance Tracker)
- [x] Shared component library
- [x] Railway backend integration
- [x] Real-time compliance monitoring

### Phase 2 (Planned)
- [ ] Vulnerability Scanner app
- [ ] Incident Response app
- [ ] Advanced AI features
- [ ] Mobile application

### Phase 3 (Future)
- [ ] Security Training app
- [ ] Reporting Analytics app
- [ ] Enterprise features
- [ ] Advanced compliance automation

---

**CyberWise AI Advisor** - Transforming cybersecurity investment through AI-powered insights.

