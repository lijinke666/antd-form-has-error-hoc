const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js"
};
window.matchMedia = () => ({});
window.scrollTo = () => {};

Enzyme.configure({ adapter: new Adapter() });