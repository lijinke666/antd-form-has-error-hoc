import React from 'react'
import { shallow, mount } from 'enzyme'
import { Form } from 'antd'

import withAntdFormHasError from '../src'

describe('antd form create hoc test', () => {
  let Component
  beforeEach(() => [
    (Component = ({ form: { getFieldDecorator } }) => (
      <Form>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: false, message: 'Please input your Password!' }]
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
      </Form>
    ))
  ])
  it('should get hasError from this.props', () => {
    const App = withAntdFormHasError()(Component)
    const wrapper = mount(<App />)
    expect(wrapper.props().hasError).toEqual(true)
  })
})
