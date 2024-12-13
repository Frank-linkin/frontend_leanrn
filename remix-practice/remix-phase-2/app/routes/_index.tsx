// Point8： 使用index来指定默认路由，当访问根路径时，会渲染Index组件
export default function Index() {
    return (
      <p id="index-page">
        This is a demo for Remix.
        <br />
        Check out{" "}
        <a href="https://remix.run">the docs at remix.run</a>.
      </p>
    );
  }
  