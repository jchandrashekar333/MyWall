'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import styles from './login.module.css'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setInfoMessage(null)
    const result = isLogin ? await login(formData) : await signup(formData)
    
    if (result && 'error' in result && typeof result.error === 'string') {
      setError(result.error)
    } else if (result && 'message' in result && typeof result.message === 'string') {
      setInfoMessage(result.message)
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        {infoMessage && <div className={styles.infoMessage}>{infoMessage}</div>}

        <form action={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="handle">Handle</label>
              <div className={styles.handleWrapper}>
                <span className={styles.prefix}>mywall.com/</span>
                <input id="handle" name="handle" required pattern="[a-z0-9-]+" title="Only lowercase letters, numbers, and hyphens allowed" />
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? 'Processing...' : isLogin ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className={styles.toggleBtn}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}
