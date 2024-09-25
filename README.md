## Technologies and Libraries used

- Next.JS 14
- Javascript
- TailwindCSS
- NextAuth.js for Spotify OAuth authentication

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`SPOTIFY_CLIENT_SECRET`

`SPOTIFY_CLIENT_ID`

`NEXTAUTH_URL= http://localhost:3000`

`NEXTAUTH_SECRET`

#### Spotify API credentials

- **Step 1**: Go to the [Spotify's developer dashboard](https://developer.spotify.com/dashboard/) and log in with your Spotify credentials
- **Step 2**: Click on **CREATE AN APP** button on the applications page. Enter the name and description for the application.
- **Step 3**: After creating the application, copy the **Client ID** and **Client Secret** and paste it into the .env file.
- **Step 4**: In the application page itself, click on **Edit Settings** button. Under the **Redirect URIs** section, add the redirect URL in the text field provided as follows:

  `http://localhost:3000/api/auth/callback/spotify`

  When the project is deployed, add another redirect URL as follows:

  `https://xyz.domain/api/auth/callback/spotify`

- **Step 5**: In the **Users and Access** page, add the email addresses for the accounts you want to test the application for. Your own account is enabled by default so no there's no need to add your own account's email.

#### NEXTAUTH_SECRET

To create a secret key, open your terminal, run the command below and copy the value generated to the .env file.

```bash
openssl rand -base64 32
```
