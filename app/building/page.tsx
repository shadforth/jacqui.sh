import Image from 'next/image'
import { quickLinkClassName } from '@/lib/quick-link'
import { TrackedLink } from '@/components/TrackedLink'

export const metadata = { title: 'Building', description: 'Projects and products built by Jacqui Shadforth.' }

const projects = [
  {
    name: 'bułka.com',
    url: 'https://bułka.com',
    description: "A blog about travel, food, and bread.",
    stack: 'Next.js, TypeScript, Redis',
    logo: '/media/logos/bulka.jpg',
    logoBg: undefined,
    logoPadding: false,
    live: true,
  },
  {
    name: 'donutdriven.dev',
    url: 'https://donutdriven.dev',
    description: 'A rewards platform simplifying recognition and celebrations for remote teams.',
    stack: 'Next.js, TypeScript, PostgreSQL, Stripe',
    logo: '/media/logos/ddd.png',
    logoBg: '#020617',
    logoPadding: true,
    live: true,
  },
  {
    name: 'clouds.jacqui.sh',
    url: 'https://clouds.jacqui.sh',
    description: 'I just really like clouds.',
    stack: 'Next.js, TypeScript',
    logo: '/media/logos/cloud.png',
    logoBg: '#3B6594',
    logoPadding: true,
    live: true,
  },
  {
    name: 'polish.jacqui.sh',
    url: 'https://polish.jacqui.sh',
    description: 'A web app for practicing your Polish vocabulary.',
    stack: 'React, TypeScript, PostgreSQL, PWA',
    logo: '/media/logos/polish.png',
    logoBg: '#F4BD42',
    logoPadding: true,
    wip: true,
  },
]

export default function BuildingPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:py-24">
      <div className="building-header">
        <h1 className="heading-markazi">Building</h1>
        <span className="building-last-updated">
          <span className="font-medium">Last updated</span>: 23 April 2026
        </span>
      </div>
      
      <ul className="building-projects-list">
        {projects.map((p) => (
          <li key={p.name} className="building-project-item">
            <div className="building-logo-container" style={{ background: p.logoBg ?? 'hsl(var(--muted))' }}>
              <TrackedLink 
                href={p.url} 
                eventName="external_link_click" 
                eventData={{ label: p.name, location: 'building_logo' }} 
                external 
                className="building-logo-link"
              >
                <Image 
                  src={p.logo} 
                  alt={p.name} 
                  width={48} 
                  height={48} 
                  style={{ 
                    width: p.logoPadding ? '72%' : '100%', 
                    height: p.logoPadding ? '72%' : '100%', 
                    objectFit: p.logoPadding ? 'contain' : 'cover' 
                  }} 
                />
              </TrackedLink>
            </div>
            
            <div className="building-project-content">
              <div className="building-project-header">
                <span className="building-project-title">
                  <TrackedLink 
                    href={p.url} 
                    eventName="external_link_click" 
                    eventData={{ label: p.name, location: 'building' }} 
                    external 
                    className={quickLinkClassName}
                  >
                    {p.name}
                  </TrackedLink>
                  {p.live && (
                    <span className="building-badge building-badge-active">
                      active
                    </span>
                  )}
                  {p.wip && (
                    <span className="building-badge building-badge-wip">
                      shelved
                    </span>
                  )}
                </span>
                <span className="building-stack">
                  {'{ '}{p.stack}{' }'}
                </span>
              </div>
              <p className="building-description">
                {p.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
