import AppRoutes from './routes/AppRoutes';
import {AuthProvider} from './features/auth/components/AuthProvider';

function App() {
  return(
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;