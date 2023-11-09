import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styles from './CalculatorStyles';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      currentValue: '',
      operator: '',
      previousValue: '',
    };
  }

  handleButtonPress = (value) => {
    if (value === '=' && this.state.operator) {
      this.calculateResult();
    } else if (value === 'C') {
      this.clearDisplay();
    } else if (value === '←') { // Botão de backspace
      this.backspace();
    } else if (value === '.' && this.state.currentValue.includes('.')) {
      // Evita múltiplos pontos decimais
      return;
    } else if (/\d/.test(value)) {
      this.updateDisplay(value);
    } else if (/[\+\-\*\/]/.test(value)) {
      if (!this.state.operator) {
        this.setOperator(value);
      } else {
        this.calculateResult(); // Calcular quando um novo operador é pressionado
        this.setOperator(value);
      }
    }
  };

  updateDisplay = (value) => {
    this.setState((prevState) => ({
      display: prevState.display === '0' ? value : prevState.display + value,
      currentValue: prevState.currentValue + value,
    }));
  };

  clearDisplay = () => {
    this.setState({
      display: '0',
      currentValue: '',
      operator: '',
      previousValue: '',
    });
  };

  backspace = () => {
    this.setState((prevState) => {
      const currentValue = prevState.currentValue;
      if (currentValue.length <= 1) {
        return {
          display: '0',
          currentValue: '',
        };
      } else {
        return {
          display: currentValue.slice(0, -1),
          currentValue: currentValue.slice(0, -1),
        };
      }
    });
  };

  setOperator = (operator) => {
    if (this.state.currentValue === '') {
      return;
    }
    this.setState((prevState) => ({
      operator,
      previousValue: prevState.currentValue,
      currentValue: '',
      display: prevState.display + operator,
    }));
  };

  calculateResult = () => {
    const { currentValue, operator, previousValue } = this.state;
    if (operator && previousValue && currentValue) {
      let result = '';
      switch (operator) {
        case '+':
          result = (parseFloat(previousValue) + parseFloat(currentValue)).toString();
          break;
        case '-':
          result = (parseFloat(previousValue) - parseFloat(currentValue)).toString();
          break;
        case '*':
          result = (parseFloat(previousValue) * parseFloat(currentValue)).toString();
          break;
        case '/':
          if (currentValue === '0') {
            // Divisão por zero, tratar como erro
            result = 'Erro';
          } else {
            result = (parseFloat(previousValue) / parseFloat(currentValue)).toString();
          }
          break;
        default:
          result = '0';
      }
      this.setState({
        display: result,
        currentValue: result,
        operator: '',
        previousValue: '',
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.display}>{this.state.display}</Text>
        <View style={styles.buttonRow}>
          <Button title="C" onPress={() => this.handleButtonPress('C')} style={styles.button} />
          <Button title="←" onPress={() => this.handleButtonPress('←')} style={styles.button} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="7" onPress={() => this.handleButtonPress('7')} style={styles.button} />
          <Button title="8" onPress={() => this.handleButtonPress('8')} style={styles.button} />
          <Button title="9" onPress={() => this.handleButtonPress('9')} style={styles.button} />
          <Button title="/" onPress={() => this.handleButtonPress('/')} style={styles.button} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="4" onPress={() => this.handleButtonPress('4')} style={styles.button} />
          <Button title="5" onPress={() => this.handleButtonPress('5')} style={styles.button} />
          <Button title="6" onPress={() => this.handleButtonPress('6')} style={styles.button} />
          <Button title="*" onPress={() => this.handleButtonPress('*')} style={styles.button} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="1" onPress={() => this.handleButtonPress('1')} style={styles.button} />
          <Button title="2" onPress={() => this.handleButtonPress('2')} style={styles.button} />
          <Button title="3" onPress={() => this.handleButtonPress('3')} style={styles.button} />
          <Button title="-" onPress={() => this.handleButtonPress('-')} style={styles.button} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="0" onPress={() => this.handleButtonPress('0')} style={styles.button} />
          <Button title="." onPress={() => this.handleButtonPress('.')} style={styles.button} />
          <Button title="=" onPress={() => this.handleButtonPress('=')} style={styles.button} />
          <Button title="+" onPress={() => this.handleButtonPress('+')} style={styles.button} />
        </View>
      </View>
    );
  }
}
