import React from 'react'
import ViewCounter from './ViewCounter'

export default function FooterBlock({ data }) {
  const copyright = data?.copyright || `© ${new Date().getFullYear()}`

  return (
    <footer className="footer-block" role="contentinfo">
      <ViewCounter apiUrl="/api/views" storageKey="frontend_views_count" />
      <div className="footer-copy" aria-hidden="false">{copyright}</div>
    </footer>
  )
}