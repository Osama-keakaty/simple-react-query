import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// ! defining Query client means create a new cache to our queries 
// ! so if we defined it inside app code every rendering will define a new cache and we will not be able to Benefit of it.

// TODO this is the default query Client 
// const queryClient = new QueryClient({});
// TODO we can set a default things for the all queries like staleTime duration and gcTime using defaultOptions 
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 6000, gcTime: 10 * 60 * 1000 } },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
