import { useState } from 'react';
import { apiRequest } from '../lib/api.js';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

export default function ContactForm({ selectedFeature }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('Sending...');
    try {
      const response = await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ ...form, selectedFeature }),
      });
      setStatus(response.message);
      setForm(initialForm);
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-container">
        <div className="section-heading">
          <h2 id="contact-title">Get in touch</h2>
          <p>Have questions? We'd love to hear from you</p>
        </div>
        <form className="contact-card" onSubmit={handleSubmit}>
          <p className="form-context">Selected interest: {selectedFeature}</p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={updateField}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={updateField}
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us what you're looking for..."
            value={form.message}
            onChange={updateField}
            required
          />
          <button className="button button-primary form-button" type="submit">
            Send Message
          </button>
          <div className="form-status" role="status" aria-live="polite">
            {status}
          </div>
        </form>
      </div>
    </section>
  );
}
