import React, { PureComponent, useRef } from 'react'
import ReactDOM from 'react-dom'
import withAntdFormHasError from '../src'
import { Form, Input, Button, Checkbox, Divider } from 'antd'

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
    visible: true,
    fields: []
  }
  onToggleVisible = e => {
    this.setState(
      {
        visible: e.target.checked
      },
      () => {
        this.props.resetFieldsStatus()
      }
    )
  }
  addFields = () => {
    this.setState(
      {
        fields: [...this.state.fields, 1]
      },
      () => {
        this.props.resetFieldsStatus()
      }
    )
  }
  render() {
    const { visible, fields } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={formStyles}>
        <h2>Dynamic Form</h2>
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
        {visible && (
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your Phone!' }]
            })(<Input type="text" placeholder="phone" />)}
          </Form.Item>
        )}
        {fields.map((_, index) => {
          return (
            <Form.Item key={index}>
              {getFieldDecorator(`field-${index}`, {
                rules: [{ required: true, message: 'required' }]
              })(<Input type="text" placeholder="phone" />)}
            </Form.Item>
          )
        })}
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
            checked={visible}
            onChange={this.onToggleVisible}
          >
            toggle phone visible
          </Checkbox>
          <Button type="link" onClick={this.addFields}>
            Add Fields
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

class ParentComponent extends PureComponent {
  render() {
    const defaultFieldsValue = {
      username: 'test user name',
      password: 123456
    }
    return <CreateForm defaultFieldsValue={defaultFieldsValue} />
  }
}

const Demo = () => {
  return (
    <div>
      <Divider orientation="left">
        <Button
          type="link"
          href="https://github.com/lijinke666/antd-form-has-error-hoc"
          target="_blank"
        >
          Source Code
        </Button>
      </Divider>
      <CreateForm />
      <EditForm />
      <IgnoreForm />
      <DynamicForm />
      <ParentComponent />
    </div>
  )
}

ReactDOM.render(<Demo />, document.getElementById('root'))
