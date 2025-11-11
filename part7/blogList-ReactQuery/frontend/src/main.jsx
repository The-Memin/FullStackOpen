import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { UserLoginProvider } from './contexts/UserLoginContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
            <UserLoginProvider>
                <Router>
                    <App/>
                </Router>
            </UserLoginProvider>
        </NotificationContextProvider>
    </QueryClientProvider>
)