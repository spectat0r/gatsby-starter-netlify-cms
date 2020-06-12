import React from 'react'
import {Link} from 'gatsby'

import logo from '../img/logo.svg'
import { navigate } from 'gatsby-link'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}
const Footer = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      isValidated: false
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
            navBarActiveClass: 'is-active',
          })
          : this.setState({
            navBarActiveClass: '',
          })
      }
    )
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    return (
      <form
        name="contact"
        method="post"
        action="/contact/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don’t fill this out:{' '}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor={'name'}>
            Your name
          </label>
          <div className="control">
            <input
              className="input"
              type={'text'}
              name={'name'}
              onChange={this.handleChange}
              id={'name'}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor={'email'}>
            Email
          </label>
          <div className="control">
            <input
              className="input"
              type={'email'}
              name={'email'}
              onChange={this.handleChange}
              id={'email'}
              required={true}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor={'message'}>
            Message
          </label>
          <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      required={true}
                    />
          </div>
        </div>
        <div className="field">
          <button className="button is-link" type="submit">
            Send
          </button>
        </div>
      </form>,
      <footer className="footer">
        <nav
          className="navbar is-transparent"
          role="navigation"
          aria-label="main-navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item" title="Logo">
                <img src={logo} alt="Kaldi" style={{width: '88px'}}/>
              </Link>
              {/* Hamburger menu */}
              <div
                className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                data-target="navMenu"
                onClick={() => this.toggleHamburger()}
              >
                <span/>
                <span/>
                <span/>
              </div>
            </div>
            <div
              id="navMenu"
              className={`navbar-menu ${this.state.navBarActiveClass}`}
            >
              <div className="navbar-start has-text-centered">
                <Link className="navbar-item" to="/about">
                  About
                </Link>
                <Link className="navbar-item" to="/products">
                  Products
                </Link>
                <Link className="navbar-item" to="/blog">
                  Blog
                </Link>
                <Link className="navbar-item" to="/contact">
                  Contact
                </Link>
                <Link className="navbar-item" to="/contact/examples">
                  Form Examples
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </footer>
    )
  }
}

export default Footer
