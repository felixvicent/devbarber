import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from "@react-native-community/async-storage";

import { UserContext } from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import SignInput from '../../components/SignInput';

import Api from '../../Api';

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({ routes: [{ name: 'SignUp' }] })
  }

  const handleSignClick = async () => {
    if(emailField !== '' && passwordField !== ''){
      let json = await Api.signIn(emailField, passwordField);

      if(json.token){
        await AsyncStorage.setItem('token', json.token);

        userDispatch({
          type: 'setAvatar',
          payload: { avatar: json.data.avatar }
        });

        navigation.reset({ routes: [{ name: 'MainTab' }] })
      }
      else {
        alert('Email ou senha errados');
      }
    }
    else {
      alert('Preencha os campos');
    }
  }

  return (
    <Container>
      <BarberLogo width='100%' height='160' />

      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder='Digite seu email'
          value={ emailField }
          keyboardType='email-address'
          onChangeText={ text => setEmailField(text) }
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder='Digite sua senha'
          value={ passwordField }
          password
          onChangeText={ text => setPasswordField(text) }
        />

        <CustomButton onPress={ handleSignClick } >
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={ handleMessageButtonClick } >
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}