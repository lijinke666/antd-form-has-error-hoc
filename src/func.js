import React, { useEffect, useState, useMemo } from 'react'
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

    useEffect(() => {
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
            allFields[field] = {
              value: getFieldValue(field),
              errors: null,
              status: null
            }
          })

        setFields(allFields)
      })
    }, [])
    return <WrappedComponent {...props} hasError={hasError} />
  }
  AntdFormHasError.prototype.displayName = `HOC(${getDisplayName(
    WrappedComponent
  )})`

  return AntdFormHasError
}

export default AntdFormHasErrorForFunction
