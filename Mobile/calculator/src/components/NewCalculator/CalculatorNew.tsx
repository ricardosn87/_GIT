import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState(0);
  const [operation, setOperation] = useState<null | string>(null);
  const [isNewEntry, setIsNewEntry] = useState(true);

  // Adiciona dígitos ao display
  function addDigit(n: string) {
    if (displayValue === '0' || isNewEntry) {
      setDisplayValue(n);
      setIsNewEntry(false);
    } else {
      setDisplayValue(displayValue + n);
    }
  }

  // Limpa o display e reinicia valores
  function clearMemory() {
    setDisplayValue('0');
    setCurrentValue(0);
    setOperation(null);
    setIsNewEntry(true);
  }

  // Define a operação e guarda o valor atual para a operação
  function handleSetOperation(op: string) {
    if (operation) {
      const result = calculate(currentValue, parseFloat(displayValue), operation);
      setDisplayValue(result.toString());
      setCurrentValue(result);
    } else {
      setCurrentValue(parseFloat(displayValue));
    }
    setOperation(op);
    setIsNewEntry(true);
  }

  // Realiza o cálculo com base na operação selecionada
  function calculate(a: number, b: number, operator: string): number {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : NaN; // Tratamento para divisão por zero
      default:
        return b;
    }
  }

  // Executa o cálculo final ao pressionar "="
  function handleEqual() {
    if (operation) {
      const result = calculate(currentValue, parseFloat(displayValue), operation);
      setDisplayValue(result.toString());
      setCurrentValue(result);
      setOperation(null);
      setIsNewEntry(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.display}>{displayValue}</Text>
      <View style={styles.buttons}>
        <Button label="AC" onPress={clearMemory} />
        <Button label="/" onPress={() => handleSetOperation('/')} />
        <Button label="7" onPress={() => addDigit('7')} />
        <Button label="8" onPress={() => addDigit('8')} />
        <Button label="9" onPress={() => addDigit('9')} />
        <Button label="*" onPress={() => handleSetOperation('*')} />
        <Button label="4" onPress={() => addDigit('4')} />
        <Button label="5" onPress={() => addDigit('5')} />
        <Button label="6" onPress={() => addDigit('6')} />
        <Button label="-" onPress={() => handleSetOperation('-')} />
        <Button label="1" onPress={() => addDigit('1')} />
        <Button label="2" onPress={() => addDigit('2')} />
        <Button label="3" onPress={() => addDigit('3')} />
        <Button label="+" onPress={() => handleSetOperation('+')} />
        <Button label="0" onPress={() => addDigit('0')} style={{ flex: 2 }} />
        <Button label="." onPress={() => addDigit('.')} />
        <Button label="=" onPress={handleEqual} />
      </View>
    </SafeAreaView>
  );
}

// Componente de botão reutilizável
function Button({ label, onPress, style }: { label: string; onPress: () => void; style?: object }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  display: {
    fontSize: 48,
    textAlign: 'right',
    margin: 20,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '25%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  buttonText: {
    fontSize: 32,
    color: '#333',
  },
});

export default App;
