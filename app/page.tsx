export default function HomePage() {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace('/dashboard')`,
        }}
      />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/dashboard" />
      </noscript>
    </div>
  )
}