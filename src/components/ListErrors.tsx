import React, { FC } from 'react';
import { useSelector } from '../services/hooks';
import { TAPIErrors } from '../services/api.types';

const ListErrors: FC = () => {
  const { errors } = useSelector((state) => state.api.errorObject) ?? {};
  if (errors) {
    return (
      <ul className='error-messages'>
        {Object.keys(errors).map((error : string) => (
          <li key={error}>
            {error}
            {' '}
            {errors[error as keyof TAPIErrors]}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

export default ListErrors;
