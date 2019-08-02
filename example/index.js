import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import withAntdFormHasError from '../src'
import { Form, Input, Button, Checkbox } from 'antd'

const formStyles = {
  border: '1px solid #dcdcdc',
  borderRadius: 10,
  margin: 20,
  padding: 30
}

@Form.create()
@withAntdFormHasError()
class CreateForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={formStyles}>
        <h2>create form</h2>
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

@Form.create()
@withAntdFormHasError()
class EditForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={formStyles}>
        <h2>edit form</h2>
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
      password: 123456
    })
  }
}

@Form.create()
@withAntdFormHasError(['phone'])
class IgnoreForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={formStyles}>
        <h2>Initialize ignore phone field & not required field </h2>
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
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your Phone!' }]
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

@Form.create()
@withAntdFormHasError()
class DynamicForm extends PureComponent {
  state = {
    required: true
  }
  onToggleRequired = e => {
    this.setState({
      required: e.target.checked
    },()=>{
      this.props.form.resetFields(['password'])
    })
  }
  render() {
    const { required } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={formStyles}>
        <h2>Dynamic Form </h2>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: required, message: 'Please input your username!' }
            ]
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: required, message: 'Please input your Password!' }
            ]
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
          <Checkbox
            style={{ marginLeft: 20 }}
            checked={required}
            onChange={this.onToggleRequired}
          >
            required
          </Checkbox>
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
    <DynamicForm/>
  </div>
)

ReactDOM.render(<Demo />, document.getElementById('root'))
