"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center">
              <h2 className="font-heading-secondary text-h3 text-copper">
                משהו השתבש
              </h2>
              <p className="mt-2 text-body text-cream-muted">
                נסו לרענן את העמוד
              </p>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className="mt-4 border border-copper px-6 py-2 text-caption text-copper transition-colors hover:bg-copper hover:text-primary"
              >
                נסו שוב
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
