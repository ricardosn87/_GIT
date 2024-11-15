/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NewCalculator  from '../calculator/src/components/NewCalculator/CalculatorNew.tsx'

AppRegistry.registerComponent(appName, () => NewCalculator);
