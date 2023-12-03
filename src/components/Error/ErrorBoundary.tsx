import { Component, ErrorInfo, ReactNode } from 'react';
import { MdError } from 'react-icons/md';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: `${err.name}: ${err.message}` };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary: ', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-center flex-col gap-4">
          <h1>Sorry.. there was an error</h1>
          <p>{this.state.message}</p>
          <p>
            Try{' '}
            <a
              className="cursor-pointer underline text-indigo-600"
              onClick={() => location.reload()}
            >
              refreshing
            </a>{' '}
            the page
          </p>
          <MdError className="w-40 h-40 fill-red-600" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
