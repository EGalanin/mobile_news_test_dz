import { lazy } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LazyComponent } from './components/LazyComponent/LazyComponent';

const NewsList = lazy(() => import('./components/NewsList/NewsList'));
const Header = lazy(() => import('./components/Header/Header'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LazyComponent fallback="Loading header...">
        <Header />
      </LazyComponent>

      <div style={{ flex: 1, padding: '20px' }}>
        <LazyComponent fallback="Loading news...">
          <NewsList />
        </LazyComponent>
      </div>

      <LazyComponent fallback="Loading footer...">
        <Footer />
      </LazyComponent>
    </div>
  );
}

export default App;
