import { json,LinksFunction,redirect,LoaderFunctionArgs } from "@remix-run/node"
import {
  Form,
  Links,
  Meta,
  Scripts,
  Outlet,
  ScrollRestoration,
  useLoaderData,
  NavLink,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import { useEffect } from "react";


import { createEmptyContact, getContacts} from "./data";

import appStylesHref from "./app.css?url"

//Point1: 使用LinksFunction来指定css文件，注意上面20行的代码，是typescript中指定
//css文件路径的写法
export const links: LinksFunction = () => [
  { rel: "stylesheet",href: appStylesHref},
];

// Point3 : 使用loader和useLoaderData组合来从后端获取数据，并渲染。
// 使用NavLink或者Link来实现client side navigation（主要是通过to属性）。
//Point8: 这里使用了LoaderFunctionArgs来获取request对象，request对象中包含了
//当前请求的所有信息，比如url，method，formData等 
// Point9: URLSearchParams 是一个用于处理 URL 查询参数（query string）的 Web API。以下是主要用法：
// // 1. 创建 URLSearchParams 对象
// 方法一：从字符串创建
// const params = new URLSearchParams('?name=张三&age=25');

// // 方法二：从对象创建
// const params2 = new URLSearchParams({
//     name: '张三',
//     age: '25'
// });

// // 2. 常用方法
// // 获取参数
// params.get('name');  // '张三'
// params.get('age');   // '25'

// // 检查参数是否存在
// params.has('name');  // true
// params.has('email'); // false

// // 设置参数
// params.set('city', '北京');

// // 添加参数（可以添加多个同名参数）
// params.append('hobby', '读书');
// params.append('hobby', '游泳');

// // 删除参数
// params.delete('age');

// // 获取所有参数名
// params.keys();   // Iterator ['name', 'city', 'hobby', 'hobby']

// // 获取所有参数值
// params.values(); // Iterator ['张三', '北京', '读书', '游泳']

// // 转换为字符串
// params.toString(); // "name=张三&city=北京&hobby=读书&hobby=游泳"
export const loader = async ({request}:LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);
  return json({contacts,q})
}

export const action = async ()=>{
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function weApp() {

  const { contacts,q   } = useLoaderData<typeof loader>();
  // Point6: 使用useNavigation来获取当前的导航状态，比如loading，idle等，
  // 然后后面定赢了className根据navigation.state来设置
  //useNavigation应该还包含其他更多的属性。
  const navigation = useNavigation();
  const submit = useSubmit();
  // Point9: 使用navigation.location来获取当前的location对象
  // navigation.location - 这是来自 useNavigation hook 的属性，表示正在进行的导航的
  // 目标位置。如果有导航正在进行，这个值就会存在。
  //&& - 这是逻辑与操作符，只有当 navigation.location 存在时，才会执行后面的代码。 
  // navigation.location.search 获取 URL 中的查询字符串部分
  // URLSearchParams 是一个用于处理 URL 查询参数的 API
  const searching = navigation.location &&
  new URLSearchParams(navigation.location.search).has("q");



  useEffect(()=>{
    const searchField = document.getElementById("q");
    if(searchField instanceof HTMLInputElement){
      searchField.value = q;
    }
  },[q])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">

          <h1>Remix Contacts</h1>
          <div>
            {/* Point4： 使用Form组件来处理表单提交，Form组件会拦截相应的请求，发往对应的action
            如果没有指定method属性，则默认为get请求，而get请求不会粗发action，而是会触发loader。当表单提交时，
            会将表单数据作为URL参数添加到当前路由，触发当前路由(root.tsx)的loader重新执行
            这就是为什么在loader中我们可以通过url.searchParams.get("q")来获取搜索参数
            */}
            <Form id="search-form" role="search" onChange={(event)=>{
              const isFirstSearch = q === null;
              // Point11: 使用submit函数来提交表单，
              // useSubmit hook 返回一个 submit 函数，用于提交表单数据。
              // 主要功能：
              // 可以手动触发表单提交
              // 支持提交 FormData、HTMLFormElement 或普通对象
              // 可以控制导航行为（replace 或 push）
              // 可以指定提交方法（GET、POST 等）
              submit(event.currentTarget, {
                replace: !isFirstSearch,
                })
              }}>
              <input
                id="q"
                // Point10: 这里使用了searching变量来控制input的className，
                // 当searching为true时，input的className为loading，否则为空字符串 
                // 使用下面的 hidden={!searching} 来控制spinner的显示和隐藏
                // 而spinner的样式定义在了css文件中
                className={searching?"loading":""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    {/* Point5:  NavLink 是 Link 的特殊版本，专门用于导航菜单
NavLink 提供了额外的样式功能，可以知道当前链接是否处于激活状态，其实就是下面的className=...的函数，来控制是否active*/}
                    <NavLink 
                      to={`contacts/${contact.id}`}
                      className={({isActive,isPending})=>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        
        
        <div id="detail"
          className={navigation.state === "loading" && !searching
            ?"loading":""}
        >
          {/* Point2: <Outlet> 用于在父路由中渲染子路由的内容,它相当于一个"占位符"，告诉 Remix 在这个位置渲染匹配的子路由组件 */}
          <Outlet></Outlet>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
