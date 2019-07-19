# antd-form-has-error-hoc

[![npm](https://img.shields.io/npm/dm/antd-form-create-hoc.svg?style=flat-square)](https://www.npmjs.com/package/antd-form-create-hoc)
[![npm version](https://img.shields.io/npm/v/antd-form-create-hoc.svg?style=flat-square)](https://badge.fury.io/js/antd-form-create-hoc)

A ant-design form enhance high order component , auto collects form errors , you can use `this.props.hasError`

disabled your submit button, effectively reduce the amount of code

## Installation

using `yarn` :

```
yarn add antd-form-has-error-hoc
```

using `npm` :

```
npm install antd-form-has-error-hoc --save
```

## Example

online example : [https://lijinke666.github.io/antd-form-has-error-hoc/](https://lijinke666.github.io/antd-form-has-error-hoc/)


## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import withAntdFormHasError, { IAntdFormHasErrorProps } from '../src';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

type Props = IAntdFormHasErrorProps & FormComponentProps;

@withAntdFormHasError()
class App extends PureComponent<Props> {
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.hasError)  // true
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('username', {
            // if set required true the hoc is ignore the field error
            rules: [{ required: true, message: 'Please input your username!' }]
          })(<Input placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            // if set required false the hoc is ignore the field error
            rules: [{ required: false, message: 'Please input your Password!' }]
          })(<Input type="password" placeholder="Password" />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"

            // all required field not empty and validate success `this.props.hasError` is false
            disabled={this.props.hasError}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}


// for edit

@withAntdFormHasError()
class App extends PureComponent<Props> {
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.hasError)  // false
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
    );
  }
  componentDidMount() {

    // if edit , after set fields value complete , `this.props.hasError` is false
    this.props.form.setFieldsValue({
      username: "test user name",
      password: 123456
    })
  }
}


// for ignore

@withAntdFormHasError(['username','password'])
class App extends PureComponent<Props> {
  render() {
    const { getFieldDecorator } = this.props.form;

    // username and password field is required, but by hoc , you can ignore
    console.log(this.props.hasError)  // true
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
    );
  }
}
```

## Development

```
git clone https://github.com/lijinke666/antd-form-has-error-hoc.git
npm install
npm start
```

## License

[MIT](https://github.com/lijinke666/antd-form-has-error-hoc/blob/master/LICENSE)
