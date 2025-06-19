// frontend/src/ErrorBoundary.js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("React Error:", error, info);
  }

  render() {
    return this.state.hasError ? (
      <h2>Connection failed. Check console for errors.</h2>
    ) : (
      this.props.children
    );
  }
}