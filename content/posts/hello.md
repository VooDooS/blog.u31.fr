---
title: "Meta journal : creating a Hugo static blog"
date: 2017-08-20T14:18:00+02:00
draft: true
---
# Introduction
In this journal I will describe the creation process if this very blog. I have been tinkering with web technology for a long time. My first website was a simple static HTML page with fancy colors, tables and horizontal bars. Then I started to create  my own php-powered dynamic sites before moving to Symfony. More recently I experimented with various heavy duty CMS such as Drupal, Rails and Wordpress . For this blog I started my journey over, using simple static HTML again.

How ironic ! Static pages are coming back, a part pf our hipster-retro degenerescence ? Static site generator became very popular during the last few years and are packed with many great features. In fact, the progress of HTML5 and Javascript make static pages a lot less static than before and we will see how even integrate a comment system to our post pages.

I'm collecting the data I learned making this blog, but I'm no expert of static site generation. If you find mistakes or have nifty tricks to share, please do use the comments to notify overs !

But enough chit-chat, here is our roadmap :

* Choosing an engine
* Basic installation
* Adding some fancy features (color syntaxing and latex display)
* Creating a custom theme
* Going to production

# Choosing an engine
The obvious (and probably among the best) option is Jekyll. It's the most famous and widely used one. Furthermore it's tightly integrated to GitHub as a generator for GitHub hosted pages.

Hugo easier install, no need for ruby (but python for syntax higlight). Easier worflow according to several sources. But less documented, smaller community. Curious about Go.

List of relevant blog posts :

* https://opensource.com/article/17/5/hugo-vs-jekyll

# Installation

There are extensive instruction for MacOs, Linux and Windows installations in the official documentation. I will only focus on installing over Debian stable in this tutorial.

I'm under Debian Stretch (actual stable version) which is supporting Snap packages. If you don't have Snap installed use :
{{< code bash >}}apt-get install snapd{{< /code >}}

And then install Hugo with :
{{< code bash >}}snap install hugo{{< /code >}}

If your system does not support Snap, you can dowload a pre-compiled binary from the latest release (https://github.com/gohugoio/hugo/releases) or compile Hugo yourself from source (https://github.com/gohugoio/hugo).

You can test your installation with the `hugo version` command.

# Hello world

Let's create a new site  and a new theme :
{{< codecard "Creation commands" bash >}}# Create a folder names mySite with the skeleton inside :
hugo new site mySite
# Create a new theme myTheme in the Themes directory :
hugo new theme myTheme
{{< /codecard >}}

When initializing the site Hugo created a config file, you should at list correct the name of your website and add the customized theme. A complete list of option is available here (https://gohugo.io/getting-started/configuration/#all-variables-yaml).



Now we add some content to be shown by creating our first post :

    hugo new post/hello.md

This will create the `content/post/hello.md` file with some basic metadata in it, including a "draft" flag.
