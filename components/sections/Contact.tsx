'use client';

import { useState, FormEvent } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiGithub } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import styles from './Contact.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

const CONTACT_METHODS = [
  {
    Icon: HiOutlineMail,
    label: 'Email Me',
    value: 'izzykasandradonque.com',
  },
  {
    Icon: HiOutlinePhone,
    label: 'Call Me',
    value: '+63 966 790 0266',
  },
  {
    Icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/missdott',
  },
  {
    Icon: HiOutlineLocationMarker,
    label: 'Location',
    value: 'Cebu City, Philippines',
  },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in every field before sending.');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg((err as Error).message || 'Something went wrong — please email me directly instead.');
    }
  }

  return (
    <section className="section section-pad" id="contact">
      <div className={styles.sectionHead}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowNum}>05</span> / CONTACT
        </div>
        <h2 className="t-h1" style={{ marginTop: 12 }}>
          Let&apos;s build something
          <br />
          worth orbiting.
        </h2>
        <p className={`t-body ${styles.intro}`}>
          Have a project in mind or looking for a collaborator? Send a message and I&apos;ll reply soon.
        </p>
      </div>

      <div className={styles.splitRow}>
        <div className={styles.methodsColumn}>
          {CONTACT_METHODS.map(({ Icon, label, value }) => (
            <div key={label} className={styles.methodCard}>
              <div className={styles.methodIcon}>
                <Icon />
              </div>
              <div>
                <div className={styles.methodLabel}>{label}</div>
                <div className={styles.methodValue}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formCard}>
          <h3 className="t-h2">Send a Message</h3>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Your Name</label>
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Your Email</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea
                className={styles.input}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </Button>

            {status === 'sending' && (
              <div className={`${styles.status} ${styles.sending}`}>
                <span className={styles.spinner} /> Sending your message…
              </div>
            )}
            {status === 'success' && (
              <div className={`${styles.status} ${styles.success}`}>
                Message sent — I&apos;ll get back to you within 24h.
              </div>
            )}
            {status === 'error' && <div className={`${styles.status} ${styles.errorState}`}>{errorMsg}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}