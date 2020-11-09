import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import BarberLogo from '../../assets/barber.svg'
import PersonIcon from '../../assets/person.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import SignInput from '../../components/SignInput';

export default () => {
  const navigation = useNavigation();

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({ routes: [{ name: 'SignIn' }] })
  }

  const handleSignClick = () => {

  }

  return (
    <Container>
      <BarberLogo width='100%' height='160' />

      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder='Digite seu nome'
          value={ nameField }
          onChangeText={ text => setNameField(text) }
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder='Digite seu email'
          value={ emailField }
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
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={ handleMessageButtonClick } >
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}