import React, { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
    children: ReactNode;
    fallback?: React.ComponentType<{
        error: Error;
        retry: () => void;
    }>;
}
interface State {
    hasError: boolean;
    error: Error | null;
}
declare class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(error: Error): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    private retry;
    render(): string | number | boolean | Iterable<React.ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export default ErrorBoundary;
