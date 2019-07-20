import * as React from 'react';
import { FormCreateOption, FormComponentProps } from 'antd/lib/Form';
import { FormWrappedProps } from 'antd/es/Form/interface';

export interface IAntdFormHasErrorState {
  filterFields: string[]
}

export interface IAntdFormHasErrorProps {
  hasError: boolean
}

export default function withAntdFormHasError<T extends FormComponentProps<any>>(
  needIgnoreFields?: string[], formCreateOption?: FormCreateOption<T>
) : FormWrappedProps<T & IAntdFormHasErrorProps>