"use client"

import { Provider as ReduxProvider } from 'react-redux'; // Renaming the Redux provider
import store from './store';

export function ReduxProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider store={store}>
            {children}
        </ReduxProvider>
    );
};