This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Questions Answers:
1. It has a very simple rule. Each component that will have user interactions like click, dropdowns, buttons or any state related information that will be client component like in this project at /root/components/companies/companies-app.tsx it contain all ui and state related things so me it client also make it .tsx and the component that will interact with server or api request or source of data must be server component, We don't need to make it "use server" as we do for client component by default all components are server components. Also good as per my perspective most of server components should be .ts or .js unless we're not doing anything related to ui tags.

2. Not very sure about it.

3. I tried something here root\app\api\v1\companies\[id]\route.ts line number 50. Please have a look, but my be it is not very good.

4. Most of time this state will be changed in the url. component will get the url params on load it will be live state and browser back button also have the default history feature to keep it.

5. We can have 1+ api clients, but if we take example of one client that is interative to the one source of data but it is shared or used in multiple components that central configured token would be more best rather than attaching the token separately in each component. Suppose, we have a fetch or axios api client the we need to make a central configured compononent that will have the responsibility to attach the token to request before the request being sent.

6. Next.js has good enough app router structure to handle error, loading and state data. I think the make page will have the fallback component using suspanse to handling loading. For errors we should use conditionally the part of component.

7. In the database, We must have the both versions of languages, EN, Dutch content, We also have some constants contents used in manywhere in the application that can have both versions of languages. We only need to display the content according to user's prefered key that we set in the cookie storage, In this project i took help using AI tool to write this functionality.

8. I wouldn't call a Next.js page slow based only on how long the page takes to appear. First, I would measure where the performance bottleneck occurs: server rendering, API requests, database queries, JavaScript execution, or browser rendering. It also can have reason of server setup, if server has LCP very high or first content painting taking time then we also need to take care about it.

9. If we using the typescript in a project, I sure our 50% issues would be resolved during development. The left thing is the logice would be faulty. I take time to deliver the things, Try to test it manually using data variations, Unit tests – Test individual functions and business logic, Component tests – Test how React components behave and interact, End-to-end (E2E) tests – Test complete user workflows in a real browser.

## More Professionalism would if:

- Some references added as screenshots in root/issues directory.
- Drawer of company crud operations component would be more smooth UI for better user experience.
- Limit is set in the code, It would be more better if we use dropdown to select using an interface.
- Types define withing the same components would be placed in a separate folder name as "types" for better code readiablity.

## My Resume:
- You can check the resume also in issues folder to see, what am i?



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
