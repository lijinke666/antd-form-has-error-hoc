import * as React from 'react';
import { FormCreateOption, FormComponentProps } from 'antd/lib/Form';

export interface IAntdFormHasErrorState {
  filterFields: string[]
}

export interface IAntdFormHasErrorProps {
  hasError: boolean
}

export default function withAntdFormHasError<T extends FormComponentProps<any>>(
  needIgnoreFields?: string[], formCreateOption?: FormCreateOption<T>
) : void
