# nextjs-fastapi-llm-story-app
A simple app that combines nextjs, fastapi and chatgpt to generate stories.

run dev server:
```bash
npm run dev
```

# Initial setup steps
This are the steps I first took to setup the repo and get vercel deployment working e2e.

0) install vercel cli (for production deployment)

```bash
npm i -g vercel
```

1) create app:
(choose no for all options, except don't use App Router)

```bash 
npx create-next-app@15.5.9 story-generator-app --typescript
```

2) Replace nextjs backend with fastapi:
    * delete pages/api folder 
    * create new api folder in root
    * create file called index.py with the following code in

```python
from fastapi import FastAPI  # type: ignore
from fastapi.responses import PlainTextResponse  # type: ignore
from openai import OpenAI  # type: ignore

app = FastAPI()

@app.get("/api", response_class=PlainTextResponse)
def idea():
    client = OpenAI()
    prompt = [{"role": "user", "content": "Write a short fantasy story, at most 20 lines long."}]
    response = client.chat.completions.create(model="gpt-5-nano", messages=prompt)
    return response.choices[0].message.content
```

3. Add a requirements.txt in root with:
``` 
fastapi
uvicorn
openai
```

4. Replace pages/index.tsx with the following: (** note we need to include "use client" at the top of all pages as we're using a fastapi backend**)
```
"use client"

import { useEffect, useState } from 'react';

export default function Home() {
    const [idea, setIdea] = useState<string>('…loading');

    useEffect(() => {
        fetch('/api')
            .then(res => res.text())
            .then(setIdea)
            .catch(err => setIdea('Error: ' + err.message));
    }, []);

    return (
        <main className="p-8 font-sans">
            <h1 className="text-3xl font-bold mb-4">
                Business Idea Generator
            </h1>
            <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                    {idea}
                </p>
            </div>
        </main>
    );
}
```
5. Replace pages/_app.tsx with

```
import type { AppProps } from 'next/app';
import '../styles/globals.css';  // This imports Tailwind styles

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

6. Replace _document.tsx with the following:

```
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Business Idea Generator</title>
        <meta name="description" content="AI-powered business idea generation" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

6. Deploy with Vercel (requires a vercel account and vercel cli installation):
```
vercel link
vercel env add OPENAI_API_KEY
vercel .
```