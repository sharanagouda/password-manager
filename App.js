/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import AppContainer from './src/containers/AppContainer';

// UI Kitten
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {ApolloProvider} from '@apollo/react-hooks';
import {useApolloGraphClient} from './src/hooks';
import SplashScreen from 'react-native-splash-screen';
import Analytics from './src/utils/analytics';
import GlobalStore from './src/utils/globalStore';
import {ThemeContext} from './src/theme-context';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';

Analytics.init();

const App = () => {
  const client = useApolloGraphClient();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <AppearanceProvider>
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <ApplicationProvider {...eva} theme={{...eva[theme]}}>
            <ApolloProvider client={client}>
              <GlobalStore>
                <AppContainer />
              </GlobalStore>
            </ApolloProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </AppearanceProvider>
    </>
  );
};

export default App;