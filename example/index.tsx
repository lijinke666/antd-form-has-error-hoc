import React from 'react';
import ReactDOM from 'react-dom';
import AntdFormCreateHoc, { IAntdFormCreateHocProps } from '../src/index';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

type Props = IAntdFormCreateHocProps & FormComponentProps;

@(AntdFormCreateHoc() as any)
class Demo extends React.PureComponent<Props, {}> {
  render() {
    const { getFieldDecorator } = this.props.form;
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
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={this.props.hasError}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
