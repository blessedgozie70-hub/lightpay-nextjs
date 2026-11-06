* \# LightPay – Next.js Backend Integration Assignment
* 
* \*\*GitHub Repository:\*\* https://github.com/blessedgozie70-hub/lightpay-nextjs
* 
* \## Project Overview
* 
* LightPay is a digital payments application prototype built with Next.js. This assignment demonstrates Next.js App Router, server rendering, API routes, Supabase authentication, database integration, and Row Level Security (RLS).
* 
* \## 1. Next.js App Router and Shared Layout
* 
* The application uses the Next.js App Router. A shared root layout provides consistent navigation across the application.
* 
* The navigation includes Home, Login, Register, Dashboard, Notifications, SSG, and SSR.
* 
* \## 2. Static Site Generation (SSG) and Server-Side Rendering (SSR)
* 
* Two separate pages demonstrate the rendering approaches:
* 
* \- \*\*SSG (`/ssg`):\*\* Fetches data using caching and is configured to render statically during the production build.
* \- \*\*SSR (`/ssr`):\*\* Fetches fresh data on each request using `force-dynamic` and `no-store`.
* 
* \*\*Difference:\*\* SSG generates the page at build time, while SSR generates the page on the server for each request. SSG is useful for content that does not change frequently, while SSR is useful when fresh data is required.
* 
* \## 3. API Routes
* 
* An API route was implemented at `/api/tasks`.
* 
* \- \*\*GET:\*\* Returns a JSON response confirming that the LightPay API is running.
* \- \*\*POST:\*\* Accepts a task title, validates the submitted JSON, and returns the task when valid.
* \- Invalid JSON and empty task titles return an HTTP 400 response.
* 
* The GET request, valid POST request, and invalid POST request were tested successfully.
* 
* \## 4. Supabase Authentication
* 
* Supabase authentication was integrated using `@supabase/supabase-js` and `@supabase/ssr`.
* 
* The application supports:
* \- User registration.
* \- Email confirmation.
* \- User login using email and password.
* \- Logout from the Notes page.
* 
* Registration and login were successfully tested with a real Supabase account.
* 
* \*\*Authentication vs Authorization\*\*
* 
* Authentication verifies the identity of a user — it answers the question, "Who are you?" Authorization determines what an authenticated user is allowed to access or do. In LightPay, Supabase authentication identifies users, while database permissions and RLS policies control access to their notes.
* 
* \## 5. Supabase Database and Row Level Security
* 
* A `notes` table was created in Supabase with the following fields:
* 
* \- `id`: Unique UUID for each note.
* \- `user\_id`: The ID of the note's owner.
* \- `title`: The note content.
* \- `created\_at`: The date and time the note was created.
* 
* Row Level Security was enabled, with four policies:
* 
* 1\. SELECT: Users can read only their own notes.
* 2\. INSERT: Users can insert notes only when the `user\_id` matches their authenticated ID.
* 3\. UPDATE: Users can update only their own notes.
* 4\. DELETE: Users can delete only their own notes.
* 
* The Notes page successfully retrieved existing records belonging to the signed-in account.
* 
* \*\*RLS testing result:\*\* RLS was enabled and all four policies were visible in the Supabase dashboard. However, a complete cross-account isolation test was not concluded. Therefore, I cannot claim that an attempt by a second user to access another user's records was successfully tested.
* 
* \## 6. AI-Assisted Code Review Notes
* 
* AI assistance was used to understand and review important parts of the backend integration.
* 
* Key concepts reviewed include:
* 
* \- `createBrowserClient`: Creates a Supabase client for browser-side authentication and database requests.
* \- `supabase.auth.signUp()`: Registers a new user.
* \- `supabase.auth.signInWithPassword()`: Authenticates a user with email and password.
* \- `supabase.auth.getUser()`: Retrieves the currently authenticated user.
* \- `useState`: Stores component state such as notes, input values, and messages.
* \- `useEffect`: Loads notes when the Notes page is mounted.
* \- `.from("notes").select()`: Retrieves records from the Supabase notes table.
* \- `.insert()`, `.update()`, and `.delete()`: Perform database operations.
* \- RLS policies: Enforce ownership restrictions at the database level.
* 
* \*\*Security observations:\*\*
* 
* \- The Supabase publishable key is used in the browser configuration; it is not a service-role secret.
* \- `.env.local` is excluded through `.gitignore` and was not included in the GitHub upload.
* \- The application supplies the authenticated user's ID when inserting a note, but client-side values should never be trusted as the security boundary. RLS must enforce ownership independently.
* \- Error responses from authentication and database operations are displayed to the user.
* 
* The code was reviewed with AI assistance to improve understanding of the implementation. Further testing and review are still necessary before using this prototype in a production financial application.
* 
* \## 7. Conclusion
* 
* This assignment provided practical experience integrating Next.js with a backend service. I implemented routing, SSG, SSR, API endpoints, authentication, database operations, and RLS policies using Supabase.
* 
* \*\*Repository:\*\* https://github.com/blessedgozie70-hub/lightpay-nextjs

