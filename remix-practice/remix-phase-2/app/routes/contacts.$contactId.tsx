import {json} from "@remix-run/node"
import { Form, useLoaderData, useFetcher } from "@remix-run/react";
import type { FunctionComponent } from "react";
import type { LoaderFunctionArgs, ActionFunctionArgs} from "@remix-run/node";
import invariant from "tiny-invariant";

import type { ContactRecord } from "../data";
import {getContact, updateContact} from "../data";

export const loader = async( { params}: LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("Not Found",{status:404});
    }
    return json({contact});
};

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
};


export default function Contact() {
  const {contact} = useLoaderData<typeof loader>();

  return (
    <div id="contact">
      <div>
        <img
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

{/* Point7:这里的Form定义了action="destroy"，所以当表单提交时，
会触发子路由destroy的action函数，注意这里的destroy是子路由，
,同理上面的edit也触发了子路由中的action函数 */}
          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
  const fetcher = useFetcher();
  // Point14: favorite 变量根据以下逻辑确定当前状态：
    // 如果有正在处理的表单数据，使用表单中的值
    // 否则使用 contact 对象中的 favorite 值
  // 这样就实现了，用户点击后会立刻显示收藏，而不用等待网络延迟。
  // 注意Favorite组件使用了arraw function的定义方式。
  // FunctionComponent 是 React 库中的一个类型，用于定义函数组件。
  // 它要求组件函数返回一个 React 元素，并且可以接受一个 props 对象作为参数。
  // 箭头函数是一种简洁的函数定义方式，通常用于定义简单的函数。 
    const favorite = fetcher.formData
  ? fetcher.formData.get("favorite") === "true"
  : contact.favorite;

  // Point12: useFetcher hook允许我们与action和loader函数进行交互，而不会进行navigation。
  // 比如页面上的星星按钮，点击星星按钮只是表示收藏，并不会触发navigatioin，只会更新数据。
  return (
    <fetcher.Form method="post">
      <button
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};