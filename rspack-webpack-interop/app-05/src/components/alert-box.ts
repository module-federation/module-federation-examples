import { LitElement, html, customElement, property, css } from 'lit-element';

@customElement('alert-box')
export class AlertBox extends LitElement {
  @property({ type: String }) content: string = '';
  @property({ type: String }) id: string = '';

  static get styles() {
    return css`
      .alert {
        padding: 20px;
        background-color: #f44336; /* Red */
        color: white;
        margin-bottom: 15px;
      }
      .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
      }
      .closebtn:hover {
        color: black;
      }
    `;
  }

  render() {
    return html`
      <div id="${this.id}" class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        ${this.content}
      </div>
    `;
  }
}
