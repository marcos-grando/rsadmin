import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ContextAside from './utilities/contexts/ContextAside.jsx';
import ContextMessage from './utilities/contexts/ContextMessage.jsx';
import ContextConfirm from './utilities/contexts/ContextConfirm.jsx';
import './utilities/styles/style.scss';
import App from './App.jsx';
import Private from './auth/Private.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ContextAside>
                    <ContextConfirm>
                        <ContextMessage>
                            <Private>
                                <App />
                            </Private>
                        </ContextMessage>
                    </ContextConfirm>
                </ContextAside>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
)
