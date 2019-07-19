"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var src_1 = require("../src");
var antd_1 = require("antd");
var formStyles = {
    border: "1px solid #dcdcdc",
    borderRadius: 10,
    margin: 20,
    padding: 30
};
var CreateForm = /** @class */ (function (_super) {
    __extends(CreateForm, _super);
    function CreateForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateForm.prototype.render = function () {
        var getFieldDecorator = this.props.form.getFieldDecorator;
        return (<antd_1.Form style={formStyles}>
        <h2>create form</h2>
        <antd_1.Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
        })(<antd_1.Input placeholder="Username"/>)}
        </antd_1.Form.Item>
        <antd_1.Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
        })(<antd_1.Input type="password" placeholder="Password"/>)}
        </antd_1.Form.Item>
        <antd_1.Form.Item>
          <antd_1.Button type="primary" htmlType="submit" disabled={this.props.hasError}>
            Log in
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    };
    CreateForm = __decorate([
        src_1["default"]()
    ], CreateForm);
    return CreateForm;
}(react_1.PureComponent));
var EditForm = /** @class */ (function (_super) {
    __extends(EditForm, _super);
    function EditForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditForm.prototype.render = function () {
        var getFieldDecorator = this.props.form.getFieldDecorator;
        return (<antd_1.Form style={formStyles}>
        <h2>edit form</h2>
        <antd_1.Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
        })(<antd_1.Input placeholder="Username"/>)}
        </antd_1.Form.Item>
        <antd_1.Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
        })(<antd_1.Input type="password" placeholder="Password"/>)}
        </antd_1.Form.Item>
        <antd_1.Form.Item>
          <antd_1.Button type="primary" htmlType="submit" disabled={this.props.hasError}>
            Log in
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    };
    EditForm.prototype.componentDidMount = function () {
        this.props.form.setFieldsValue({
            username: "test user name",
            password: 123456
        });
    };
    EditForm = __decorate([
        src_1["default"]()
    ], EditForm);
    return EditForm;
}(react_1.PureComponent));
var IgnoreForm = /** @class */ (function (_super) {
    __extends(IgnoreForm, _super);
    function IgnoreForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IgnoreForm.prototype.render = function () {
        var getFieldDecorator = this.props.form.getFieldDecorator;
        return (<antd_1.Form style={formStyles}>
        <h2>Initialize ignore phone field & not required field </h2>
        <antd_1.Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
        })(<antd_1.Input placeholder="Username"/>)}
        </antd_1.Form.Item>
        <antd_1.Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
        })(<antd_1.Input type="password" placeholder="Password"/>)}
        </antd_1.Form.Item>
        <antd_1.Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your Phone!' }]
        })(<antd_1.Input placeholder="Phone"/>)}
        </antd_1.Form.Item>
        <antd_1.Form.Item>
          <antd_1.Button type="primary" htmlType="submit" disabled={this.props.hasError}>
            Log in
          </antd_1.Button>
        </antd_1.Form.Item>
      </antd_1.Form>);
    };
    IgnoreForm = __decorate([
        src_1["default"](['phone'])
    ], IgnoreForm);
    return IgnoreForm;
}(react_1.PureComponent));
var Demo = function () { return (<div>
    <CreateForm />
    <EditForm />
    <IgnoreForm />
  </div>); };
react_dom_1["default"].render(<Demo />, document.getElementById('root'));
