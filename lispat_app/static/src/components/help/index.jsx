import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import './help.css';
import Markdown from 'react-markdown';
import README from './Help.md';
import 'github-markdown-css';

class HelpPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.ContentMarkdown = README;
  }

  render() {
    return (
      <div>
        <Col className="left-pull">
          <div className="markdown-body api-page-container">
            <Markdown escapeHtml={false} source={this.ContentMarkdown} />
          </div>
        </Col>
      </div>
    );
  }
}

export default HelpPage;
