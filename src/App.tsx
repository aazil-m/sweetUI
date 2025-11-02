import './styles/tokens.css';

export default function App() {
  return (
    <div
      style={{
        background: 'var(--sweet-surface)',
        fontFamily: 'var(--sweet-font-family)',
        padding: 'var(--sweet-padding)',
      }}
    >
      <h1 style={{ fontSize: 'var(--sweet-text-lg)', color: 'var(--sweet-primary)' }}>
        SweetUI Design System ✓
      </h1>

      <div
        style={{
          background: 'white',
          boxShadow: 'var(--sweet-elevation-1)',
          borderRadius: 'var(--sweet-radius-md)',
          padding: 'var(--sweet-space-3)',
          marginTop: 'var(--sweet-space-3)',
        }}
      >
        <p style={{ fontSize: 'var(--sweet-text-sm)' }}>
          This card is using tokens from your Figma SweetUI system.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 'var(--sweet-gap)',
            marginTop: 'var(--sweet-space-2)',
          }}
        >
          <button
            style={{
              background: 'var(--sweet-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--sweet-radius-sm)',
              padding: '8px 16px',
            }}
          >
            Primary
          </button>

          <button
            style={{
              background: 'var(--sweet-success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--sweet-radius-sm)',
              padding: '8px 16px',
            }}
          >
            Success
          </button>

          <button
            style={{
              background: 'var(--sweet-warning)',
              color: 'black',
              border: 'none',
              borderRadius: 'var(--sweet-radius-sm)',
              padding: '8px 16px',
            }}
          >
            Warning
          </button>
        </div>
      </div>
    </div>
  );
}
