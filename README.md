# NEXT.js 16 2025/12/01



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
