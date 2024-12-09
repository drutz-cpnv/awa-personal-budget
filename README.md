# !!Diph - Budget Management

### Run the project

Install packages

```shell
npm install
```

Run vite dev server

```shell
npm run dev
```

## Deployment

### Build the project

```shell
npm run build
```

This will generate static files in the `dist` folder. You can then deploy these
files to any web server.

### Build the DB

#### Windows

```shell
Get-Content PB.sql | sqlite3 PB.db
```

## Collaborate

### Branch naming

The branches are named according to the following convention:

- `feature/feature-name` for new features

### Commit messages

The commit messages are written according to the following convention:

- `feet: commit message` for new features
- `fix: commit message` for bug fixes
- `refactor: commit message` for code refactoring
- `docs: commit message` for documentation updates
- `chore: commit message` for other changes'

## License

Distributed under the MIT License. See LICENSE.txt for more information.
