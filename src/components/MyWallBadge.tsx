import React from 'react'
import styles from './badge.module.css'

export function MyWallBadge() {
  return (
    <div className={styles.badgeWrapper}>
      <a href="https://my-wall-seven.vercel.app/" target="_blank" rel="noopener noreferrer" className={styles.badgeContainer}>
        <div className={styles.iconWrapper}>W</div>
        <span className={styles.badgeText}>⚡ Create your own MyWall</span>
      </a>
    </div>
  )
}
