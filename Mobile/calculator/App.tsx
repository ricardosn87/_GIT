/* eslint-disable no-eval */

/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';



function App() {

  const [displayValueState, setDisplayValue] = useState('0');
  const [clearDisplayState, setClearDisplay] = useState(false);
  const [operationState, setOperationState] = useState(null);
  const [valuesState, setValues] = useState([0, 0]);
  const [currentState, setCurrent] = useState(0);

  function addDigit(n: any) {
    if (n === '.' && displayValueState.includes('.')) {
      return
    }

    const clearDisplay = displayValueState === '0' || clearDisplayState
    const currentValue = clearDisplay ? '' : displayValueState
    const displayValue = currentValue + n

    setDisplayValue(displayValue)
    setClearDisplay(false)

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...valuesState]
      values[currentState] = newValue
    }
  }

  function clearMemory() {
    initialState()
  }
  function initialState() {
    setDisplayValue('0')
    setClearDisplay(false);
    setOperationState(null);
    setValues([0, 0]);
    setCurrent(0);
  }

  function setOperation(operation: any) {
    if (currentState === 0) {
      setOperationState(operation)
      setCurrent(1)
      setClearDisplay(true)
    }
    else {
      const equals = operation === '='
      const values = [...valuesState]
      try {
        values[0] = eval(`${values[0]} ${operationState}  ${values[1]}`)
      } catch (e) {
        values[0] = valuesState[0]
      }

      values[1] = 0
      setDisplayValue(`${values[0]}`)
      setOperation(equals ? null : operation)
      setCurrent(equals ? 0 : 1)
      setClearDisplay(!equals)
      setValues(values)
    }
  }

  return (

    <View style={styles.container} >
      <Display value={displayValueState} />
      <View style={styles.buttons}>
        <Button label="AC" triple={true} onClick={clearMemory} />
        <Button label="/" operation={true} onClick={() => setOperation('/')} />
        <Button label="7" onClick={() => addDigit(7)} />
        <Button label="8" onClick={() => addDigit(8)} />
        <Button label="9" onClick={() => addDigit(9)} />
        <Button label="*" operation={true} onClick={() => setOperation('*')} />
        <Button label="4" onClick={() => addDigit(4)} />
        <Button label="5" onClick={() => addDigit(5)} />
        <Button label="6" onClick={() => addDigit(6)} />
        <Button label="-" operation={true} onClick={() => setOperation('-')} />
        <Button label="1" onClick={() => addDigit(1)} />
        <Button label="2" onClick={() => addDigit(2)} />
        <Button label="3" onClick={() => addDigit(3)} />
        <Button label="+" operation={true} onClick={() => setOperation('+')} />
        <Button label="0" onClick={() => addDigit(0)} />
        <Button label="." onClick={() => addDigit('.')} />
        <Button label="=" onClick={() => setOperation('=')} />
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
