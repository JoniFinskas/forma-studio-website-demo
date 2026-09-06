import { useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { Choice } from '../components/Choice'
import { services } from '../data/projects'
import { useHydrated } from '../lib/useHydrated'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>
const budgets = [
  { value: 'exploring', label: 'Still exploring' },
  { value: 'under-50', label: 'Under £50,000' },
  { value: '50-150', label: '£50,000 to £150,000' },
  { value: '150-plus', label: 'Over £150,000' },
]

export function Contact() {
  const [search] = useSearchParams()
  const hydrated = useHydrated()
  const requested = hydrated
    ? services.find((item) => item.value === search.get('service'))?.value
    : undefined
  const [serviceOverride, setService] = useState<string | null>(null)
  const service = serviceOverride ?? requested ?? 'architecture'
  const [budget, setBudget] = useState('exploring')
  const [errors, setErrors] = useState<Errors>({})
  const [preview, setPreview] = useState<{ name: string; service: string; budget: string } | null>(
    null,
  )
  const form = useRef<HTMLFormElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const nextErrors: Errors = {}
    if (!name) nextErrors.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = 'Enter an email address, such as name@example.com.'
    if (message.length < 15)
      nextErrors.message = 'Tell us a little more, using at least 15 characters.'
    setErrors(nextErrors)
    const first = Object.keys(nextErrors)[0]
    if (first) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(`#${first}`)?.focus())
      return
    }
    setPreview({
      name,
      service: services.find((item) => item.value === service)!.label,
      budget: budgets.find((item) => item.value === budget)!.label,
    })
    requestAnimationFrame(() => heading.current?.focus())
  }

  return (
    <section className="container contact-page">
      <div className="contact-copy">
        <p className="eyebrow">Start a conversation</p>
        <h1 tabIndex={-1}>
          What are you
          <br />
          thinking about?
        </h1>
        <p className="intro-copy">
          A place, a problem or a first idea. A few details are enough to start.
        </p>
        <div className="contact-aside">
          <p className="eyebrow">A useful first brief</p>
          <p>
            Tell us what the space is for, where you are in the process and what you would like to
            change.
          </p>
        </div>
        <p className="demo-note">
          Try the form with example details. This is a fictional studio; nothing is sent or saved.
        </p>
      </div>
      <div className="inquiry-panel">
        <form ref={form} onSubmit={submit} noValidate hidden={preview !== null}>
          <h2>Your project</h2>
          <p className="form-intro">All text fields are required.</p>
          <fieldset disabled={!hydrated}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p className="field-error" id="name-error">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  placeholder="name@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p className="field-error" id="email-error">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="form-row">
              <Choice
                id="service"
                label="Project type"
                value={service}
                options={services}
                onChange={setService}
                disabled={!hydrated}
              />
              <Choice
                id="budget"
                label="Project budget"
                value={budget}
                options={budgets}
                onChange={setBudget}
                disabled={!hydrated}
              />
            </div>
            <div className="field">
              <label htmlFor="message">A little about the project</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                minLength={15}
                maxLength={3000}
                required
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : 'message-hint'}
              />
              <p className="small" id="message-hint">
                The place, the idea and any timing you have in mind.
              </p>
              {errors.message && (
                <p className="field-error" id="message-error">
                  {errors.message}
                </p>
              )}
            </div>
            <button className="button primary form-submit" type="submit">
              Preview inquiry
            </button>
            <p className="small form-note">
              This preview stays on this page. It does not send an email.
            </p>
          </fieldset>
          <noscript>
            <p>The inquiry preview needs JavaScript. No information will be sent.</p>
          </noscript>
        </form>
        <div className="inquiry-preview" hidden={!preview}>
          <p className="eyebrow">Your inquiry preview</p>
          <h2 ref={heading} tabIndex={-1}>
            A good starting point.
          </h2>
          {preview && (
            <>
              <p>Thanks, {preview.name}. Here is the outline of your example inquiry.</p>
              <dl>
                <div>
                  <dt>Project type</dt>
                  <dd>{preview.service}</dd>
                </div>
                <div>
                  <dt>Project budget</dt>
                  <dd>{preview.budget}</dd>
                </div>
              </dl>
            </>
          )}
          <p>
            Nothing has been sent or saved. Your entries remain here until you leave or reload this
            page.
          </p>
          <button
            className="button primary"
            onClick={() => {
              setPreview(null)
              requestAnimationFrame(() =>
                form.current?.querySelector<HTMLInputElement>('#name')?.focus(),
              )
            }}
          >
            Edit inquiry
          </button>
        </div>
        <p className="sr-only" role="status">
          {preview
            ? 'Inquiry preview ready. Nothing has been sent.'
            : Object.keys(errors).length
              ? 'Check the marked fields.'
              : ''}
        </p>
      </div>
    </section>
  )
}
