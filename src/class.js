import React from 'react'
import { getDisplayName, xor, isEmpty, omit, isEqual } from './utils'

const AntdFormHasErrorForClass = needIgnoreFields => WrappedComponent => {
  class AntdFormHasError extends WrappedComponent {
    get hasError() {
      const {
        form: { getFieldsError, isFieldTouched, getFieldValue },
        defaultFieldsValue
      } = this.props

      const { filterFields } = this.state
      const isEdit = !!defaultFieldsValue
      let fieldsError = getFieldsError()

      const needOmitFields = filterFields
        .filter(field => !isFieldTouched(field))
        .concat(needIgnoreFields)
      if (!isEmpty(needOmitFields)) {
        fieldsError = omit(fieldsError, needOmitFields)
      }

      return Object.keys(fieldsError).some(field => {
        const isCheckFieldTouched = !isEdit || isEmpty(getFieldValue(field))
        return isCheckFieldTouched
          ? !isFieldTouched(field) || fieldsError[field]
          : fieldsError[field]
      })
    }

    static displayName = `HOC(${getDisplayName(WrappedComponent)})`

    state = {
      filterFields: []
    }

    autoBindFormHelp = null

    getFormRef = formRef => {
      this.autoBindFormHelp = formRef
    }

    render() {
      return (
        <WrappedComponent
          wrappedComponentRef={this.getFormRef}
          {...this.props}
          hasError={this.hasError}
          resetFieldsStatus={this.resetFieldsStatus}
        />
      )
    }
    resetFieldsStatus = () => {
      this.setFieldsStatus()
    }
    setFieldsStatus = () => {
      const {
        form: { validateFields, getFieldsValue, getFieldValue, setFields }
      } = this.props

      const fields = Object.keys(getFieldsValue())

      validateFields(err => {
        const filterFields = xor(fields, Object.keys(err || []))
        this.setState({
          filterFields
        })
        const allFields = {}
        fields
          .filter(field => !filterFields.includes(field))
          .forEach(field => {
            const value = getFieldValue(field)
            allFields[field] = {
              value,
              errors: null,
              status: null,
              touched: !!value
            }
          })

        setFields(allFields)
      })
    }

    setDefaultFieldsValue = (
      defaultFieldsValue = this.props.defaultFieldsValue
    ) => {
      const { form } = this.props
      if (defaultFieldsValue) {
        const allFields = {}
        Object.keys(defaultFieldsValue).forEach(field => {
          allFields[field] = {
            value: defaultFieldsValue[field],
            errors: null,
            status: null,
            touched: true
          }
        })

        form.setFields(allFields)
      }
    }
    componentDidMount() {
      this.setFieldsStatus()
      this.setDefaultFieldsValue()
    }
    componentDidUpdate(nextProps) {
      if (!isEqual(nextProps.defaultFieldsValue, this.props.defaultFieldsValue)) {
        this.setDefaultFieldsValue(nextProps.defaultFieldsValue)
      }
    }
  }
  return AntdFormHasError
}

export default AntdFormHasErrorForClass
