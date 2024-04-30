---
sidebar_position: 1
---

# Introduction

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.







```

function isElementInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.top <=
		(window.innerHeight || document.documentElement.clientHeight)
	);
}

let isLocked = false;  // 锁标志

async function saveTweet(userName, tweetBody, userId, tweetUrl, tweetTime, tweetImages, engaged) {
    if (isLocked) {
        console.log("Operation is currently locked.");
        return;
    }

    isLocked = true;
    console.log("saving tweet");

    try {
        const result = await new Promise((resolve, reject) => {
            chrome.storage.local.get("tweets", data => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(data);
                }
            });
        });

        let tweets = result.tweets || [];
        const tweet = {
            userName: userName,
            tweetBody: tweetBody,
            userId: userId,
            tweetUrl: tweetUrl,
            tweetTime: tweetTime,
            tweetImages: tweetImages,
            captureDate: new Date().toISOString(),
            engaged: engaged,
        };

        if (!tweets.some(t => t.tweetUrl === tweetUrl)) {
            if (tweets.length >= _maxSaveNumber) {
                tweets.shift();
            }
            tweets.push(tweet);
        }

        await new Promise((resolve, reject) => {
            chrome.storage.local.set({ tweets: tweets }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error("Failed to save tweet:", error);
    } finally {
        isLocked = false;  // 解锁
    }
}
```

