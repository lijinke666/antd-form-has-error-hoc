import * as React from 'react'
import { FormComponentProps } from 'antd/lib/Form'
import { FormWrappedProps } from 'antd/lib/Form/interface'
import { RcBaseFormProps } from 'antd/lib/form/Form'

export interface IAntdFormHasErrorState {
  filterFields: string[]
}

export interface IAntdFormHasErrorProps<T extends object = object>
  extends RcBaseFormProps {
  hasError?: boolean
  updateFieldsStatus?: () => void
  defaultFieldsValue?: T
}

export default function withAntdFormHasError<T extends FormComponentProps<any>>(
  needIgnoreFields?: string[]
): FormWrappedProps<T & IAntdFormHasErrorProps>
