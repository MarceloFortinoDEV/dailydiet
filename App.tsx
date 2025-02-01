import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import { AppRoutes } from '~/routes/app.routes';

import { pt, registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', pt)

export default function App() {
  return (
    <NavigationContainer>
        <AppRoutes />
    </NavigationContainer>
  );
}
