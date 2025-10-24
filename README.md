personal site inspired by the wii home screen. feel free to use for your own site.

### technologies

- vite
- react
- typeScript
- tailwind CSS
- framer motion
- github actions
- spotify web API

### scripts

```bash
npm install
```

```bash
npm run dev
```

### spotify integration

The site displays your last played or currently playing Spotify track. To set this up:

1. See [`SPOTIFY_SETUP.md`](./SPOTIFY_SETUP.md) for detailed instructions
2. Create a `.env` file from `.env.example`
3. Add your Spotify API credentials
4. For GitHub Pages deployment, add your credentials as GitHub Secrets

**Note:** When deploying via GitHub Actions, your API keys are securely injected at build time and never committed to the repository.
