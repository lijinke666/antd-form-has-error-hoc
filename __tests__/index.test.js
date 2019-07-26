import React from 'react'
import { shallow, mount } from 'enzyme'
import { Form, Input } from 'antd'

import withAntdFormHasError from '../src'

describe('antd form create hoc test', () => {
  it('should get hasError from this.props', () => {
    @Form.create()
    @withAntdFormHasError()
    class Test extends React.Component {
      render() {
        const { getFieldDecorator } = this.props.form
        return (
          <Form>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }]
              })(<Input placeholder="Username" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }]
              })(<Input type="password" placeholder="Password" />)}
            </Form.Item>
          </Form>
        )
      }
    }
    const wrapper = mount(shallow(<Test />).get(0))
    console.log(wrapper.props())
    expect(wrapper.props().hasError).toEqual(true)
  })
})
