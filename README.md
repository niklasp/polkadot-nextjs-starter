# Polkadot Next.js Starter

This repository provides a landing (on `main`) and two full, cloneable templates for building Polkadot dApps:

- papi + reactive-dot (branch: `papi`)
- dedot + typink (branch: `typink`)

![Polkadot Next.js Starter](public/polkadot-nextjs-starter.png)

## Deploy a template

Choose a branch to clone and deploy with one click:

[![Deploy papi (reactive-dot)](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fniklasp%2Fpolkadot-nextjs-starter%2Ftree%2Fpapi)

[![Deploy typink (dedot)](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fniklasp%2Fpolkadot-nextjs-starter%2Ftree%2Ftypink)

Branch links:

- papi: <https://github.com/niklasp/polkadot-nextjs-starter/tree/papi>
- typink: <https://github.com/niklasp/polkadot-nextjs-starter/tree/typink>

## Features

- Integration with **[Polkadot API](https://papi.how)** for blockchain interactions. Using lightclients per default. Storage subscriptions, storage queries and transactions. Proper loading states for individual components that require a chain connection for best UX.
- Server rendered pages with client components where needed with**[Next.js 15.x](https://nextjs.org/docs/app/getting-started)**
- Modern, full-control react components with [shadcn ui](https://ui.shadcn.com/)
- Utility-first CSS with [Tailwind CSS 4.0](https://tailwindcss.com/)
  Data-fetching library for managing server state.
- Light and dark modes / theme management with [Next Themes](https://ui.shadcn.com/docs/dark-mode/next)

## Project Structure

- `app/`: Main application files including layout and page components.
- `components/`: Contains UI components like `PolkadotLogo`, `Footer`, and
  `Nav`.
- `providers/`: Context providers for themes, Polkadot extensions, and
  blockchain connections.
- `hooks/`: Example hooks with subscriptions.
- `lib/`: utility functions

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/niklasp/polkadot-nextjs-starter.git
   ```

2. Install dependencies:

   ```bash
   cd polkadot-nextjs-starter
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any
improvements or bug fixes.

## License

This project is open-source and available under the MIT License.
