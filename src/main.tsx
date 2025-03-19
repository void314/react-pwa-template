import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App';
import { ThemeProvider } from './components/providers';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="system">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);

