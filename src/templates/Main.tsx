import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}
    <main className="content py-5 text-xl">{props.children}</main>
  </div>
);

export { Main };
