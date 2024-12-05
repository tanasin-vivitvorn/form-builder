#!/bin/bash

# Create root directory
mkdir form-builder-backend
cd form-builder-backend

# Initialize npm and git
npm init -y
git init

# Install dependencies
npm install express mongoose cors dotenv typescript ts-node @types/node @types/express @types/mongoose @types/cors
npm install -D nodemon typescript @types/node

# Create directory structure
mkdir -p src/{models,controllers,routes,types,middleware}

# Create base files
touch src/app.ts
touch src/models/{Form.ts,FormVersion.ts}
touch src/controllers/formController.ts
touch src/routes/formRoutes.ts
touch src/types/index.ts
touch src/middleware/errorHandler.ts

# Create tsconfig.json
cat > tsconfig.json << EOL
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
EOL

# Update package.json scripts
npm pkg set scripts.start="node dist/app.js"
npm pkg set scripts.dev="nodemon src/app.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.watch="tsc -w"

# Create .gitignore
cat > .gitignore << EOL
node_modules/
dist/
.env
.DS_Store
EOL

# Create .env
cat > .env << EOL
PORT=3000
MONGODB_URI=mongodb://localhost/formbuilder
EOL

# Make the script executable
chmod +x create-backend.sh

echo "Backend project structure created successfully!"
