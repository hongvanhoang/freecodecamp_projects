const defaultContent = `![Marion Lecorche's Kitten Logo](https://upload.wikimedia.org/wikipedia/commons/6/63/Logo_chaton.svg)
# Markdown Previewer
## Made with React
### Thanks DwinaTech!
_How_ about a **link** to [Astronomy Picture of the Day](https://apod.nasa.gov/apod/astropix.html)
> | 'Nobody's perfect' - Some Like It Hot (1959)
Mars' moons
1. Phobos
1. Deimos
\`<div>Here's an inline code</div>\`
<pre><code>HTML element</code></pre>
\`\`\` 
const blockQuote = (param) => {
    if(param) {
        return param
    }
    else{
        return param*2
    }
}

\`\`\`
`;



marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  } });


const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const Editor = ({ content, handleChange }) => /*#__PURE__*/React.createElement("textarea", { value: content, onChange: handleChange, id: "editor" });

const Previewer = ({ content }) => /*#__PURE__*/React.createElement("div", { id: "preview", dangerouslySetInnerHTML: {
    __html: marked.parse(content, { renderer: renderer }) } });

//const Previewer=({content}) => <div id="preview">{content} </div>

const App = () => {
  const [content, setContent] = React.useState(defaultContent);
  const handleChange = event => {
    setContent(event.target.value);
  };
  return /*#__PURE__*/(
    React.createElement("div", { className: "main" }, /*#__PURE__*/
    React.createElement(Editor, { content: content, handleChange: handleChange }), /*#__PURE__*/
    React.createElement(Previewer, { content: content })));
};
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#App"));