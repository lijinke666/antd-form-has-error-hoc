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

    static displayName = `AntdFormHasError(${getDisplayName(WrappedComponent)})`

    state = {
      lastFields: [],
      filterFields: []
    }

    render() {
      const { forwardRef, wrappedComponentRef, ...rest } = this.props
      return (
        <WrappedComponent
          wrappedComponentRef={wrappedComponentRef}
          {...rest}
          hasError={this.hasError}
          updateFieldsStatus={this.updateFieldsStatus}
          ref={forwardRef}
        />
      )
    }
    updateFieldsStatus = () => {
      this.setFieldsStatus()
    }
    setFieldsStatus = () => {
      const {
        form: {
          validateFields,
          getFieldsValue,
          getFieldValue,
          setFields,
          getFieldsError
        }
      } = this.props

      const { lastFields } = this.state

      const fields = Object.keys(getFieldsValue())
      const fieldsError = getFieldsError()

      validateFields(() => {
        const filterFields = xor(fields, Object.keys(fieldsError || []))
        const transformedFields = fields
          .filter(field => !filterFields.includes(field))
          .reduce((allFields, field) => {
            const value = getFieldValue(field)
            const error = fieldsError[field]
            const errors =
              error && lastFields.includes(field) ? [new Error(error)] : null
            allFields[field] = {
              value,
              errors,
              status: null,
              touched: !!value
            }
            return allFields
          }, {})

        setFields(transformedFields)
        this.setState({
          lastFields: fields,
          filterFields
        })
      })
    }

    setDefaultFieldsValue = (
      defaultFieldsValue = this.props.defaultFieldsValue
    ) => {
      const {
        form: { setFields }
      } = this.props
      if (defaultFieldsValue) {
        const allFields = {}
        Object.keys(defaultFieldsValue).forEach(field => {
          const value = defaultFieldsValue[field]
          allFields[field] = {
            value,
            errors: null,
            status: null,
            touched: !!value
          }
        })
        setFields(allFields)
      }
    }
    componentDidMount() {
      this.setFieldsStatus()
      this.setDefaultFieldsValue()
    }
    componentDidUpdate(nextProps) {
      if (
        !isEqual(nextProps.defaultFieldsValue, this.props.defaultFieldsValue)
      ) {
        this.setDefaultFieldsValue(nextProps.defaultFieldsValue)
      }
    }
  }

  return React.forwardRef((props, ref) => {
    return <AntdFormHasError {...props} forwardRef={ref} />
  })
}

export default AntdFormHasErrorForClass
