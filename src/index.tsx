import * as React from 'react'
import { Form } from 'antd'
import { xor, isEmpty, omit } from 'lodash'

const getDisplayName = (component: React.ComponentClass) => {
  return component.displayName || component.name || 'Component'
}

export interface IAntdFormCreateHocProps {
  hasError: boolean
}

interface IAntdFormCreateHocState {
  filterFields: string[]
}

/**
 * @name AutoBindForm
 * @param needIgnoreFields string[] 需要忽略验证的字段
 * @param {WrappedComponent.defaultFieldsValue} object 表单初始值
 */
const autoBindForm = (needIgnoreFields: string[] = []) => (
  WrappedComponent: React.ComponentClass<any>,
) => {
  class AutoBindForm extends WrappedComponent {
    get hasError() {
      const {
        form: { getFieldsError, isFieldTouched, getFieldValue },
        defaultFieldsValue,
      } = this.props

      const { filterFields } = this.state
      const isEdit = !!defaultFieldsValue
      let fieldsError = getFieldsError()

      const needOmitFields = filterFields
        .filter((field) => !isFieldTouched(field))
        .concat(needIgnoreFields)
      if (!isEmpty(needOmitFields)) {
        fieldsError = omit(fieldsError, needOmitFields)
      }

      return Object.keys(fieldsError).some((field) => {
        const isCheckFieldTouched = !isEdit || isEmpty(getFieldValue(field))
        return isCheckFieldTouched
          ? !isFieldTouched(field) || fieldsError[field]
          : fieldsError[field]
      })
    }

    static displayName = `HOC(${getDisplayName(WrappedComponent)})`

    state: IAutoBindFormHelpState = {
      filterFields: [],
    }

    autoBindFormHelp: React.Component<{}, {}> = null

    getFormRef = (formRef: React.Component) => {
      this.autoBindFormHelp = formRef
    }

    render() {
      return (
        <WrappedComponent
          wrappedComponentRef={this.getFormRef}
          {...this.props}
          hasError={this.hasError}
        />
      )
    }
    componentDidMount() {
      const {
        form: { validateFields, getFieldsValue, getFieldValue, setFields },
      } = this.props

      const fields = Object.keys(getFieldsValue())

      validateFields((err: object) => {
        const filterFields = xor(fields, Object.keys(err || []))
        this.setState({
          filterFields,
        })

        const allFields: { [key: string]: any } = {}
        fields
          .filter((field) => !filterFields.includes(field))
          .forEach((field) => {
            allFields[field] = {
              value: getFieldValue(field),
              errors: null,
              status: null,
            }
          })

        setFields(allFields)

        if (this.props.defaultFieldsValue) {
          this.props.form.setFieldsValue(this.props.defaultFieldsValue)
        }
      })
    }
  }

  return Form.create()(AutoBindForm)
}

export default autoBindForm
