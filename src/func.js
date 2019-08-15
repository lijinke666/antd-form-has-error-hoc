import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { getDisplayName, xor, isEmpty, omit } from './utils'

const AntdFormHasErrorForFunction = needIgnoreFields => WrappedComponent => {
  const AntdFormHasError = props => {
    const [filterFields, setFilterFields] = useState([])
    const [lastFields, setLastFields] = useState([])

    const hasError = useMemo(() => {
      const {
        form: { getFieldsError, isFieldTouched, getFieldValue },
        defaultFieldsValue
      } = props

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
    }, [filterFields, props])

    const setFieldsStatus = useCallback(() => {
      const {
        form: {
          validateFields,
          getFieldsValue,
          getFieldValue,
          setFields,
          getFieldsError
        }
      } = props

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
          }, {})

        setFilterFields(filterFields)
        setLastFields(fields)
        setFields(transformedFields)
      })
    }, [])

    const updateFieldsStatus = useCallback(() => {
      setFieldsStatus()
    }, [])

    const setDefaultFieldsValue = useCallback(() => {
      const { form } = props
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
    }, [defaultFieldsValue])

    useEffect(() => {
      setFieldsStatus()
      setDefaultFieldsValue()
    }, [])

    useEffect(() => {
      setDefaultFieldsValue()
    }, [props.defaultFieldsValue])

    const { forwardRef, wrappedComponentRef, ...rest } = props
    return (
      <WrappedComponent
        {...rest}
        wrappedComponentRef={wrappedComponentRef}
        hasError={hasError}
        updateFieldsStatus={updateFieldsStatus}
        ref={forwardRef}
      />
    )
  }
  AntdFormHasError.prototype.displayName = `AntdFormHasError(${getDisplayName(
    WrappedComponent
  )})`

  return React.forwardRef((props, ref) => {
    return <AntdFormHasError {...props} forwardRef={ref} />
  })
}

export default AntdFormHasErrorForFunction
