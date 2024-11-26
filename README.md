#### Hello everyone 👋, this is my [personal website's](https://souptik.dev) brain and brawn

---

**One line description :**
This is a decoupled WordPress website, I mainly use for blogging and also as my personal portfolio.

![Decoupled WordPress Banner](./docs/images/RepoLogo.png)

#### Table of Content

| Topics |
| --- |
| [History](#history) |
| [Back to present🪄🪄](#back-to-present-) |
| [Backend](#backend) |
| [Deployment](#deployment-) |
| [Local development](#local-development) |

#### History

This website was initially a static website hosted on Github Pages only. The design was almost same as the but the main difficulty was when writing a blog. Not only I have to write the blog in HTML but also had to push the code and deploy it every single time I had to create a blog. And if there was something to edit, then again the same process.

But I can't blame myself too much for this because initially I created this website long ago intending it to be a more portfolio based website where in the home page I would display my projects just like the blogs are now.
But then I thought to write blogs and didn't bother to update the whole website's codebase to be fit as a blogging website.

But now it is time time to finally migrate the website to a proper CMS(Content Management System), which would let me to focus on writing more rather than pushing and deploying code.

So, let's close the current website and build something better. Or on a second note, I should preserve my first ever portfolio/blog website. You know about subdomains?

#### Back to present 🪄🪄

The backend directory of the website contains the code for backend WordPress website. WordPress is responsible for storing and managing all the blogs and pages, in the backend.
The frontend is written in Next.js which fetches the data from the WordPress backend using GraphQL and then build maximum of the static pages and serves some of the dynamic pages on the fly.
When some page or blog is updated on the backend, *Incremental Static Regeneration* is used to rebuild the old page and then populate with the new contents.
**The on-demand regeneration URL should have increased timeout. But anything above than 10s requires a paid plan. Refer this - <https://github.com/vercel/vercel/discussions/4502>. So, only solution now is asynchronous regeneration.**

#### Backend

Here is the list of plugins being used in the backend and there roles-

- WP GraphQL ( Used for communicating between frontend and backend ).
- WP GraphqlQL Gutenberg ( Used for getting block data of posts, i.e to get the entire content of the post to display it in the frontend ).
- WPS Hide Login ( Used for changing the main login route i.e `wp-login.php` to something other to hide the login screen ).
- Connecting SMPT server to WordPress. To send mails through that SMTP server. Currently I am using `Sendinblue` which provides a free tire of 300 emails/day.
  - WP Mail SMTP
  - WPForms Lite
- MailPoet ( To schedule emails, e.g when new blog is published, etc. ).
- **[This document](https://github.com/Souptik2001/Souptik2001.github.io/blob/master/docs/README.md) contains custom modification made to some of the third-party plugins which were not provided by the plugin but were needed. So, special care is to be taken while updating the plugins. The same custom changes are to be carried over to the new version of the plugin till those features are not made available natively by the plugins.**

#### Deployment 💾

- The backend deployment is pretty simple. It can be deployed on any publicly accessible server. In my case my backend is deployed on my brother's home-server.
  - One good practice here is to redirect all the links to the frontend URL of the website, except the login path i.e `wp-admin`.
  - In top of that, `WPS Hide Login` plugin is installed to change the login screen path to something else, so that normal people can't just guess and visit the login page.
  - Change the permalink format to anything with a slug.
  - After that in the `Souptik2001` plugin's settings page you have to write the frontend revalidate URL and also the revalidate secret.
- The frontend is written in Next.js and can be deployed on any server also. But I preferred to deploy it on Vercel, because come-on they only say **Deploy Next.js in seconds**.
Set the environment variables mentioned in `sample.env` and that's it. Here we are done.

### Local Development

#### First spin-up the backend

- Go to `backend` folder.
- Run `composer install`.
- Run `docker composer up`.
- To stop the service run `docker composer down`.

#### Now let's get the front-end started

- Run `nvm use`. If you don't have the node version installed run `nvm install`.
- Run `npm install`.
- Copy the `sample.env` to `.env` and fill in the values.
- Run `npm run dev`.

Thanks for reading.✨✨
