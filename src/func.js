import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { getDisplayName, xor, isEmpty, omit } from './utils'

const AntdFormHasErrorForFunction = needIgnoreFields => WrappedComponent => {
  const AntdFormHasError = props => {
    const [filterFields, setFilterFields] = useState([])

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
        form: { validateFields, getFieldsValue, getFieldValue, setFields }
      } = props

      const fields = Object.keys(getFieldsValue())

      validateFields(err => {
        const filterFields = xor(fields, Object.keys(err || []))
        setFilterFields(filterFields)

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
    }, [])

    const resetFieldsStatus = useCallback(() => {
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
    })

    useEffect(() => {
      setDefaultFieldsValue()
    }, [props.defaultFieldsValue])

    return (
      <WrappedComponent
        {...props}
        hasError={hasError}
        resetFieldsStatus={resetFieldsStatus}
      />
    )
  }
  AntdFormHasError.prototype.displayName = `HOC(${getDisplayName(
    WrappedComponent
  )})`

  return AntdFormHasError
}

export default AntdFormHasErrorForFunction
