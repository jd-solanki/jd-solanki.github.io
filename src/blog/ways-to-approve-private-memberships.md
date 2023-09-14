---
title: Ways To Approve Private Memberships
tags: tech, system design
---

# {{ $frontmatter.title }}

I was building support system for communities and wanted to know something from my friends on what they use. Gathering their and mine knowledge here's what I found.

When building community you might not want to public your community for various reasons. This includes,

- You want to build a community/(support system) for your customers
- You want to avoid spam
- You want to build community for your group/friends/employees

With private community there are several ways you can approve membership. Here are some of them,

## 🧐 Approve by human review

You can approve membership by reviewing each and every request. In this kind of community, community is visible to public but don't have public access. User will find your organization and request for join. This is good for small communities but as your community grows it becomes difficult to approve each and every request.

#### Pros

- You can control who joins your community
- You can avoid spam

#### Cons

- It's time consuming

#### For whom

- Small communities
- Communities where you want to control who joins

## 📭 Approve by invite

You can approve membership by sending invite to user. This kind of community is not visible to public. User can join only if they have invite they received from community maintainer/moderator. This is good for private communities where you explicitly want to provide access and don't want any public requests.

#### Pros

- You can control who joins your community
- You can avoid spam
- You can avoid public requests

#### Cons

- You need to send invite to each and every user manually

#### For whom

- Private communities where owner wants to only provide access to specific users. For example, communities for employees, communities for friends, communities for customers.

## 🔐 Third party authentication

You can approve membership by authenticating user with third party services like various marketplaces or subscription services etc. This is good for communities who runs the business and want to provide support to their customers or subscribers.

For example, if you are building community for product you sell on marketplace then you can authenticate user with that marketplace and provide access to your community. After user authenticate using third party service, you can check if user has purchased your product or not and provide access & role accordingly.

#### Pros

- Automate membership approval
- Only users who purchased your product can join your community
- No spam

#### Cons

- You need to provide integration with third party services

#### For whom

- Communities for customers/subscribers
