
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import withAntdFormHasError from '../src'
import { Form, Input, Button } from 'antd'

const formStyles = {
  border: '1px solid #dcdcdc',
  borderRadius: 10,
  margin: 20,
  padding: 30,
}

@withAntdFormHasError()
class CreateForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={formStyles}>
        <h2>create form</h2>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.props.hasError}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

@withAntdFormHasError()
class EditForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={formStyles}>
        <h2>edit form</h2>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.props.hasError}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
  }
  componentDidMount() {
    this.props.form.setFieldsValue({
      username: 'test user name',
      password: 123456,
    })
  }
}

@withAntdFormHasError(['phone'])
class IgnoreForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={formStyles}>
        <h2>Initialize ignore phone field & not required field </h2>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your Phone!' }],
          })(<Input placeholder="Phone" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.props.hasError}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const Demo = () => (
  <div>
    <CreateForm />
    <EditForm />
    <IgnoreForm />
  </div>
)

ReactDOM.render(<Demo />, document.getElementById('root'))
