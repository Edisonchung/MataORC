#!/bin/bash

echo "🚀 Setting up MataOCR project structure..."

# Frontend setup
cd frontend

# Create layout.tsx
mkdir -p src/app
cat > src/app/layout.tsx << 'LAYOUT'
# Paste the layout.tsx content I provided earlier
LAYOUT

# Create page.tsx
cat > src/app/page.tsx << 'PAGE'
# Paste the page.tsx content I provided earlier
PAGE

# Create API client
mkdir -p src/lib/api
cat > src/lib/api/client.ts << 'CLIENT'
# Paste the client.ts content I provided earlier
CLIENT

echo "✅ MataOCR structure created!"
