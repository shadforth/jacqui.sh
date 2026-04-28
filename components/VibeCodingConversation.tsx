import Image from 'next/image'

type Role = 'user' | 'ai'

interface Message {
  role: Role
  text: string
}

interface VibeCodingConversationProps {
  caption?: string
}

const MESSAGES: Message[] = [
  { role: 'user', text: 'Please sift the flour' },
  { role: 'ai', text: 'Done' },
  { role: 'user', text: 'Melt the butter and sugar on the stove' },
  { role: 'ai', text: 'Done' },
  { role: 'user', text: 'Oh, wait, we need to preheat the oven' },
  { role: 'ai', text: 'Done' },
  {
    role: 'user',
    text: 'Wait, what temperature did you set it at? It should be 160°C and fan-forced',
  },
  { role: 'ai', text: 'Done' },
  { role: 'user', text: 'Did you check on the stove?' },
  { role: 'ai', text: 'What stove?' },
]

const PEOPLE: Record<Role, { name: string; avatar: string }> = {
  user: { name: 'Jacqui', avatar: '/media/profile/headshot.jpeg' },
  ai: { name: 'AI assistant', avatar: '/media/posts/harness-engineering/claude-logo.jpeg' },
}

export function VibeCodingConversation({ caption }: VibeCodingConversationProps) {
  return (
    <figure className="not-prose my-8">
      <div className="rounded-2xl border border-border bg-muted/20 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-center py-3 border-b border-border">
          <span className="text-xs font-normal text-muted-foreground">Baking with AI</span>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-2 px-4 py-5">
          {MESSAGES.map((msg, i) => {
            const person = PEOPLE[msg.role]
            const isUser = msg.role === 'user'
            const prev = MESSAGES[i - 1]
            const next = MESSAGES[i + 1]
            const isGrouped = prev?.role === msg.role
            const isLastInGroup = !next || next.role !== msg.role
            const isPunchline = i === MESSAGES.length - 1

            return (
              <div
                key={i}
                className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${isPunchline ? 'mt-3' : ''}`}
              >
                {/* Avatar — only shown on last message of each group */}
                <div className="flex-shrink-0 w-7 h-7">
                  {isLastInGroup ? (
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7" />
                  )}
                </div>

                {/* Name + bubble */}
                <div
                  className={`flex flex-col gap-0.5 max-w-[72%] ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {!isGrouped && (
                    <span className="text-xs font-normal text-muted-foreground px-1">
                      {person.name}
                    </span>
                  )}
                  <div
                    className={`px-3.5 py-2 text-sm leading-relaxed ${
                      isUser
                        ? `bg-blue-500 text-white ${isLastInGroup ? 'rounded-2xl rounded-br-sm' : 'rounded-2xl'}`
                        : `bg-muted text-foreground border border-border ${isLastInGroup ? 'rounded-2xl rounded-bl-sm' : 'rounded-2xl'}`
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {caption && (
        <figcaption
          className="mt-2 block text-center text-sm"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
