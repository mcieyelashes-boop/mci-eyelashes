export default function Catalogue() {
  return (
    <main style={{ minHeight: '100vh', background: '#0a1720', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: '#e8d5b7', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Product Catalogue</h1>
        <p style={{ opacity: 0.7 }}>Coming soon — contact us for our full wholesale catalogue.</p>
        <a href="/#contact" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.75rem 2rem', background: '#c9a96e', color: '#0a1720', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}>
          Request Catalogue
        </a>
      </div>
    </main>
  )
}
