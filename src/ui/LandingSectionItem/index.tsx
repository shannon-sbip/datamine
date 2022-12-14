import { FC, ReactNode } from "react";
const LandingSectionItem: FC<{
    title: string,
    items: string[],
    node: ReactNode,
    opposite?: boolean
  }> = (props) => {
    const {
      title, items, node, opposite
    } = props;
    return (
      <div className="flex flex-col sm:flex-row">
        {!opposite && (
        <div className="w-full sm:w-1/2 p-6">
          <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
            {title}
          </h3>
          {items.map((item) => (
            <p key={item} className="text-gray-600 mb-8 text-justify">
              {item}
            </p>
          ))}
        </div>
        )}
        <div className="flex w-full sm:w-1/2 p-6 items-center">
          {node}
        </div>
        { opposite && (
        <div className="w-full sm:w-1/2 p-6 mt-6">
          <div className="align-middle">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              {title}
            </h3>
            {items.map((item) => (
              <p key={item} className="text-gray-600 mb-8">
                {item}
              </p>
            ))}
          </div>
        </div>
        )}
      </div>
    );
  };
export default LandingSectionItem;
