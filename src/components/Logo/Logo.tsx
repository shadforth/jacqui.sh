import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <div className={clsx('flex flex-col', className)}>
      <span className="text-2xl font-bold text-white dark:text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
        Jacqui Shadforth
      </span>
      <span className="text-sm text-gray-400 dark:text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
        Software engineer and designer
      </span>
    </div>
  )
}
