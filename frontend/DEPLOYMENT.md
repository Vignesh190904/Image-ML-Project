# Deployment Configuration Guide

## 🚀 Local Development

For local development, the app runs at the root URL:
```
http://localhost:3000/
```

**No configuration needed** - just run `npm start`

## 🌐 GitHub Pages Deployment

To deploy to GitHub Pages, add the homepage field to `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  // ... rest of package.json
}
```

Then deploy:
```bash
npm run deploy
```

## 📦 Other Deployment Platforms

### Netlify/Vercel
- No homepage configuration needed
- App will be served at root URL
- Just connect your repository

### Firebase Hosting
- No homepage configuration needed
- App will be served at root URL

### Custom Domain
- Set homepage to your custom domain
- Example: `"homepage": "https://yourdomain.com"`

## 🔧 Configuration Examples

### Local Development (Current)
```json
{
  // No homepage field
}
```

### GitHub Pages
```json
{
  "homepage": "https://vignesh190904.github.io/image-ml-project"
}
```

### Custom Domain
```json
{
  "homepage": "https://celebrity-classifier.com"
}
```

## 📝 Notes

- The `homepage` field only affects the **build** process
- For **development**, the app always runs at `http://localhost:3000/`
- Remove the `homepage` field for local development
- Add it back when deploying to platforms that need it 