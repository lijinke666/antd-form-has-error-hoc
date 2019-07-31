import createAntdFormHasErrorForClass from './class'
import createAntdFormHasErrorForFunction from './func'

// https://overreacted.io/zh-hans/how-does-react-tell-a-class-from-a-function/
// https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/react-reconciler/src/ReactFiber.js#L297-L300
const isClassComponent = Component => {
  const prototype = Component.prototype
  return !!(prototype && prototype.isReactComponent)
}

const withAntdFormHasError = (needIgnoreFields = []) => WrappedComponent => {
  if (isClassComponent(WrappedComponent)) {
    return createAntdFormHasErrorForClass(needIgnoreFields)(WrappedComponent)
  }
  return createAntdFormHasErrorForFunction(needIgnoreFields)(WrappedComponent)
}

export default withAntdFormHasError
