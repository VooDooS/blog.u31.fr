---
title: "A Hugo static blog #1 : \"Hello blog !\""
date: 2017-08-20T14:18:00+02:00
draft: true
---
# Introduction
In this journal I will describe the creation process of this very blog. I have been tinkering with web technology for a long time. My first website was a simple static HTML page with flashy colors, tables and horizontal separators. Then I started to create  my own php-powered dynamic sites before moving to Symfony. More recently I experimented with various heavy duty CMS such as Drupal, Rails and Wordpress. For this blog I decided to start my journey over, using simple static HTML again.

Ironic isn’t it ? Static pages are having a great come back (maybe that is a part of the retro wave that is pixelating the world these days). Static sites generator have become very trendy during the last few years and are packed with many great features. In fact, the progresses of HTML5 and Javascript make static pages a lot less static than before (you can also easily add some dynamic features if you really need it, for example a comment system using [Disqus](https://disqus.com/) or [Staticman](https://staticman.net/)).

In fact static pages are powerful enough for most blogging usage. I believe it’s the right fitted tool for the site I have in mind, half-blog / half-portfolio, and that is why I chose to give it a try !

I will be sharing, in the form of a tutorial, my experience using ***Hugo***, but I'm no expert of static site generation. If you find any mistakes or have nifty tricks to share, please do use the comments to notify others !

But enough chit-chat, here is our roadmap :

### Part I
* Choosing an engine
* Basic installation
* Hello world

### Part II
* The templating engine
* Custom shortcodes
* Do it with style !

### Part III
* Workflow raffinements
* Going to production

# Choosing an engine
The most common (and probably a very good one) option is Jekyll. It's the most famous and widely used static blog generator. Furthermore it's tightly integrated to GitHub as a generator for GitHub hosted pages. Hugo is the main challenger of Jekyll. They both have very similar overall functionality and workflow. 

{{< urlcard "Jekyll" >}}https://jekyllrb.com/{{< /urlcard >}} have a bigger user base and more complete documentation. Blog posts are also more numerous. It’s surely is a more mature solution.

One the other hand [Hugo](https://gohugo.io/) claims do be easier to install (no Ruby business) and way faster to generate thanks to it being written in [Go](https://golang.org/). But it’s documentation seem a bit loose and community tutorial are less numerous.

Both would have perfectly fill my needs but I still decided to go for Hugo, because I was intrigued by the Go language and if I was going to write a nième tutorial it would be best to do it for le less documented platform. If you want to spare for headache, you may consider to go for Jekyll instead.

List of relevant blog posts :

* https://opensource.com/article/17/5/hugo-vs-jekyll
* https://novelist.xyz/tech/hugo-vs-jekyll-static-site-generator/
* https://www.smashingmagazine.com/2015/11/static-website-generators-jekyll-middleman-roots-hugo-review/

# Installation

There are [extensive instructions](https://gohugo.io/getting-started/installing/) for MacOs, Linux and Windows installations in the official documentation. I will only focus on installing over Linux in this tutorial.

I'm under Debian Stretch (actual stable version) which is supporting Snap packages. If you don't have Snap installed use :

{{< code bash >}}apt-get install snapd{{< /code >}}

And then install Hugo with :

{{< code bash >}}snap install hugo{{< /code >}}

If your system does not support Snap, you can dowload a pre-compiled binary from the [latest release](https://github.com/gohugoio/hugo/releases) or compile Hugo yourself from [source](https://github.com/gohugoio/hugo).

You can test your installation with the `hugo version` command.

# Hello world

Let's create a {{< codecard "new site and theme." "Creation commands" bash >}}
# Create a folder named mySite with the skeleton inside :
hugo new site mySite
# Create a new theme myTheme in the Themes directory :
hugo new theme myTheme
{{< /codecard >}}

When initializing the site Hugo created a config file, you should at list correct the name of your website and add the customized theme. A complete list of option is available [here](https://gohugo.io/getting-started/configuration/#all-variables-yaml).

Here is my {{< codecard "configuration file." "Hugo's configuration file in toml" toml >}}
baseURL = "http://blog.u31.fr/"
languageCode = "en-us"
title = "Blog31"
theme = "figures"

[blackfriday]
# Github like linebreaks
extensions = ["hardLineBreak"]
hrefTargetBlank = true
{{< /codecard >}}



Now we add some content to be shown by creating our first post :

    hugo new post/hello.md

This will create the `content/post/hello.md` file with some basic metadata in it, including a "draft" flag.
