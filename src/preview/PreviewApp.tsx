import { useSessionStorage } from '../utils/useSessionStorage'

const previewSizes = ['mobile', 'desktop'] as const
type PreviewSize = (typeof previewSizes)[number]

export default () => {
  const [previewSize, setPreviewSize] = useSessionStorage<PreviewSize>('previewSize', previewSizes[0])

  return (
    <div className="container">
      <header>
        <h1>RSS to Email</h1>
      </header>

      <div className={`preview preview-${previewSize}`}>
        <div className="preview-header">
          <h2>Preview</h2>
          <div>
            {previewSizes.map((size) => (
              <button key={size} onClick={() => setPreviewSize(size)} className={size === previewSize ? 'active' : ''}>
                {size}
              </button>
            ))}
          </div>
        </div>
        <iframe src="preview.html" sandbox="" />
      </div>
    </div>
  )
}
