# SecureAI - Security Investment Optimization Platform (Frontend)

A modern React frontend for the GRC Compliance Monitoring and Security Investment Optimization platform.

## Features

- **Real-time Security Dashboard**: Live monitoring of security posture and threats
- **Compliance Management**: Track compliance across multiple frameworks (SOC 2, HIPAA, GDPR, etc.)
- **Budget Optimization**: AI-powered recommendations for security investments
- **Threat Intelligence**: Advanced threat detection and analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality React components
- **Recharts**: Data visualization and charts
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend repository)

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```bash
   VITE_BACKEND_URL=http://localhost:8000
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open http://localhost:5173 in your browser

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `https://your-backend.railway.app` |

**Important**: Use `VITE_` prefix for environment variables in Vite projects (not `REACT_APP_`).

## Deployment

### Netlify Deployment

1. **Connect your repository** to Netlify
2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Configure environment variables** in Netlify dashboard:
   - `VITE_BACKEND_URL`: Your backend API URL
4. **Deploy**

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Configure environment variables on your hosting platform

## API Integration

The frontend communicates with the backend through the `/api/test` endpoint for connectivity testing and other API endpoints for data retrieval.

### API Configuration

The API client is configured in `src/api.js`:

```javascript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries
├── pages/         # Page components
├── services/      # API services
├── App.tsx        # Main application component
├── api.js         # API configuration
└── main.tsx       # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **API Connection Errors**:
   - Verify `VITE_BACKEND_URL` is set correctly
   - Check that backend is running and accessible
   - Verify CORS configuration on backend

2. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for TypeScript errors: `npm run build`

3. **Environment Variables Not Working**:
   - Ensure variables start with `VITE_` prefix
   - Restart development server after changing .env
   - Check that .env file is in project root

### Getting Help

- Check the browser console for error messages
- Verify network requests in browser dev tools
- Ensure backend API is responding correctly

