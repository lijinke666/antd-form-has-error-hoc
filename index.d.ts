import * as React from 'react'
import { FormComponentProps } from 'antd/lib/Form'
import { FormWrappedProps } from 'antd/lib/Form/interface'
import { RcBaseFormProps } from 'antd/lib/form/Form'

export interface IAntdFormHasErrorState {
  filterFields: string[]
}

export interface IAntdFormHasErrorProps extends RcBaseFormProps {
  hasError?: boolean
  resetFieldsStatus?: () => void
  defaultFieldsValue?: object
}

export interface IWithAntdFormHasErrorOptions {
  withRef?: boolean
}

export default function withAntdFormHasError<T extends FormComponentProps<any>>(
  needIgnoreFields?: string[],
  options?: IWithAntdFormHasErrorOptions
): FormWrappedProps<T & IAntdFormHasErrorProps>
