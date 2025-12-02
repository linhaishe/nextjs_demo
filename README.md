# NEXT.js 16 2025/12/01

# pre info



props:

1. its architecture - nexts automatically convert every new components you create into a server component. Unless you specifically instructed it not to. only if you need some browser functionalities. 
2. the way it handles redering - 
3. Routing - filebased routing
4. its evolution from a simple front-end lib to a full stack framework using the same file-based routing system
5. not need to worry about the server infrastructure, takes care of scaling automatically
   1. automatic code splitting
   2. ...



why can't everything be a server component?

1. Interactivity needed ( button click \ navigating) need client component
2. 如果想要组件是客户端组件，则需要add 'use client' on the top of component

Server-side pre-rendering 

server components are rendered only on the server side. while client components are pre-rendered on the server side to create a static shell and then hydrated on the client side. this means that everything within the client component that doesnt require interactivity or isn't dependent on the browser is still render on the server. the code or parts taht rely on the broswer or require interactivity are left as placeholders during serverside pre-rendering. When they reach the client, the broswer then renders the client components and fills in the placeholders left by the server. 

Server Components → 完全在服务器渲染；Client Components → 先渲染静态内容在服务器，然后浏览器再接管交互部分。

## 工作流程解析

1. **服务端预渲染（Server-side pre-rendering）**

对 Client Component：

- 浏览器不需要的静态内容还是由服务器渲染
- 依赖浏览器或者需要交互的部分 **会被留作占位符**

举例：

```jsx
<ClientComponent>
  <p>这是静态内容</p>
  <button onClick={handleClick}>点击我</button>
</ClientComponent>
```

- `<p>` 会在服务端渲染好
- `<button>` 会先作为占位符，不会有事件绑定

2. **浏览器端激活（Hydration）**

当 HTML 发送到浏览器后：

- 浏览器加载对应的 Client Component
- 用 JavaScript **填充占位符**
- 事件绑定和交互就可以正常工作

react compiler support : built-in integration for automatic memorization ( 不再需要 usememo etc. ) to reduce unnecessary  rerenders. the compiler analyzes your code at the build time and optimize rendering behaviour automatically. ( use with plugin babel-plugin-react-compiler@latest)



# routers

## basic info

## dynamic routers

## nested routers

## routers group

![image-20251202101400182](https://s2.loli.net/2025/12/02/OKxjR3IfnTSLvhH.png)

1. specific layout
2. group routers
3. dashboard的部分不需要主页的navbar
4. Error handling
   1. the error page has to be a client component, cuz hteses errors happen on the client or user side.
   2. only the closest error file to the route takes priority. 
   3. error.tsx
5. loading ui
   1. loader.tsx in root
6. Forbidden / authorise
7. fetch data
8. serverComponentsHmrCache
   1. cache that allows youy to cache fetch response in server components across hmr refreshes in local development. You'll have faster response and reduced costs for build API calls. 

https://jsonplaceholder.typicode.com/



server-side fetching and client-side fetching. 

![image-20251202104553951](https://s2.loli.net/2025/12/02/YTEDm7HKBfgJrxb.png)

serverside fetching Props:

1. Improve dx - developer experience 
2. Improve initial load time / fcp
3. better ceo
   1. search engine crawers can more easily index content rendered on the server as the content is alrady provided in HTML format. 
4. Shorter code and simplified logic
5. automatic request deduplication
   1. improve perfomance and reduce unnecessary API calls. ( when the seme data is requested multiple times at the sametime, only one request is sent)
6. improved security (vetter protect sensitive information )
7. reduced network waterfall



**HMR = Hot Module Replacement（热模块替换）**

它是前端开发中的一种技术，让你在开发模式下 **修改代码后，不用刷新整个页面，就能实时更新变化**。

in nextjs hrm is caching your content

# API Routes

# Caching

![image-20251202111039151](https://s2.loli.net/2025/12/02/xaTAGwf1duNUKjc.png)

1. Broswer cache

   1. saves static files locally

2. server cache

   1. stores pre-rendered pages & API responses

3. data cache

   1. remenbers fetched data to avoid repeat requests

Cache components / cache boundaries

open cacheComponents to true in nextConfig

Routes / components / function all can be use 'use cache'

- prerenders it at build time
- Stores it in memory
- revalidates it automatically every 15 mins by default

cacheLife() - control for the how long data stays cached 

cacheTag() - what to cache

revalidate() / revalidateTag()

| 名称    | 渲染时机              | 优点             | 缺点             |
| ------- | --------------------- | ---------------- | ---------------- |
| **SSG** | 构建时                | 极速、静态       | 数据不更新       |
| **ISR** | 构建时 + 后台定时更新 | 静态但可自动更新 | 不适合极实时数据 |
| **SSR** | 请求时                | 数据实时、SEO 强 | 每次请求都慢     |
| **PPR** | 静态 + 动态混合       | 兼具速度和实时性 | 需要理解新模式   |

## 🟦 **1. SSG — Static Site Generation（静态站点生成）**

**什么时候渲染？**
 ➡️ **构建时（build 时）预先渲染成 HTML**

**特点：**

- 所有页面在部署前就生成
- 浏览器获取的是纯静态文件
- 非常快
- 不会自动更新（除非重新 build）

**适用场景：**
 博客文章 / 不常变化的内容

------

## 🟩 **2. ISR — Incremental Static Regeneration（增量静态再生）**

**本质是 SSG + 定时增量更新**

**怎么工作？**

- 首次访问 → 用预构建的静态内容（SSG）
- 因为设置了 `revalidate`，服务器**会在后台再生成一次新静态页面**

**特点：**

- 页面仍然是静态
- **无需重新 build 全站就能让页面自动更新**
- 常用于数据变化不频繁的页面

**场景：**
 商品页面 / 新闻列表（10 秒更新一次）

------

## 🟧 **3. SSR — Server Side Rendering（服务端渲染）**

**什么时候渲染？**
 ➡️ **每次请求都会在服务器上渲染 HTML**

**特点：**

- 数据永远是最新的
- 每个请求都要算一次，速度比 SSG 慢
- 对 SEO 非常好

**常见场景：**
 动态数据页面（例如用户的 dashboard）

------

## 🟪 **4. PPR — Partial/Progressive Prerendering（部分预渲染）Next.js 13 推出的**

**最新模式（App Router 默认开启）**

**核心思想：SSG + SSR 混合使用，同一页面内可并存**

**页面如何工作？**

- 静态内容（不依赖动态数据）先在 build 时生成（SSG）
- 动态内容（如用户信息）等到请求时再渲染（SSR）
- 两者可以拆分独立加载
- 页面一部分静态、一部分实时

**特点：**

- **比纯 SSR 快**
- **比纯 SSG 更灵活**
- 完全自动（Next 13+ 默认）

**场景：**
 既有公共内容，又有个性化内容的页面
 例如产品详情页 + 用户的购买状态

   # build adapters API

create custom adapters to modify the build process. 

you and hosting providers can hook directly into the build pipeline and customize it. 

Adapter as an small brige that teaches nexts how to build for diifrent environments. 

# metadata

search engine optimization. seo

各种社交媒体间分享出来的最终样式形态，可被定义。

config-based metadata

file-cased metadata

