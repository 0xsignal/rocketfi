import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-base text-[#272E35] font-bold -ml-2 indent-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base font-serif text-[#272E35] font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-serif text-[#272E35] font-bold mt-5 mb-2">{children}</h3>
    ),

    p: ({ children }) => (
      <p className="text-sm text-[#272E35] font-sans leading-loose mb-4">{children}</p>
    ),

    ul: ({ children }) => (
      <ul role="list" className="marker:text-[#272E35]  list-disc text-sm pl-5 space-y-3 text-[#272E35]/80">{children}</ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal text-[#272E35] list-inside mb-4 space-y-2">{children}</ol>
    ),

    a: ({ href, children }) => {
      const isInternal = href?.startsWith('/')
      if (isInternal) {
        return (
          <Link
            href={href || '/'}
            className="text-[#FF6E30]/80 hover:text-[#FF6E30] underline"
          >
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6E30]/80 hover:text-[#FF6E30] underline"
        >
          {children}
        </a>
      )
    },

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">
        {children}
      </blockquote>
    ),

    pre: ({ children }) => (
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),

    img: ({ src, alt }) => (
      <span className="my-4">
        {src && <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={400}
          className="rounded-lg"
        />}
      </span>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-gray-200">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {children}
      </td>
    ),

    hr: () => <hr className="my-8 border-t border-gray-200" />,

    ...components,
  }
}