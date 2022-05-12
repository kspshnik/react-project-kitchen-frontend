import { Link, useNavigate } from 'react-router-dom';
import React, {
  ChangeEvent, FC, SyntheticEvent, useEffect,
} from 'react';
import ListErrors from '../../components/ListErrors';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  changeUsernameRegister,
  changeEmailRegister,
  changePasswordRegister,
  resetFormRegister,
} from '../../store';
import { registerThunk } from '../../thunks';
import { ButtonContainer, Form, FormContainer, FormLoginLink, FormTitle, InputFieldset } from './forms-styles';
import { useTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { FieldEmail, FieldLogin, FieldPassword, RegisterButton } from '../../ui-lib';

const RegisterForm: FC = () => {

  const { username, email, password } = useSelector((state) => state.forms.register);
  const { isUserRegistering } = useSelector((state) => state.api);
  const { isLoggedIn } = useSelector((state) => state.system);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEmailRegister(e.target.value));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePasswordRegister(e.target.value));
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUsernameRegister(e.target.value));
  };

  const submitForm = () => (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerThunk());
  };

  useEffect(() => () => {
    if (isLoggedIn) {
      navigate('/');
    }

    dispatch(resetFormRegister());
  }, [dispatch]);

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id='register' />
      </FormTitle>
      <FormLoginLink to='/login'>
        <FormattedMessage id='userLogin' />
      </FormLoginLink>
      <Form onSubmit={submitForm} >
        <InputFieldset rowGap={16}>
          <FieldLogin value={username ?? ''} onChange={onChangeUsername} />
          <FieldEmail value={email ?? ''} onChange={onChangeEmail} />
          <FieldPassword value={password ?? ''} onChange={onChangePassword} />
        </InputFieldset>
        <ButtonContainer>
          <RegisterButton disabled={isUserRegistering} />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
