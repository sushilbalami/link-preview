import autoAnimate from "@formkit/auto-animate";
import {
  CheckIcon,
  ChevronDownIcon,
  XIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";

export default function ListHeading({ tags }) {
  return (
    <div>
      {tags && (
        <div className="space-y-4">
          <ListWrapper data={tags["basic"]} />
          <ListWrapper data={tags["graph"]} />
          <ListWrapper data={tags["google"]} />
          <ListWrapper data={tags["twitter"]} />
        </div>
      )}
    </div>
  );
}

function ListWrapper({ data }) {
  const [show, setShow] = useState(true);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  return data ? (
    <div ref={parent} className="shadow rounded bg-white">
      <div
        className="py-5 divider-y cursor-pointer flex items-center justify-between border-b"
        onClick={reveal}
      >
        <h3 className="text-lg leading-6 font-bold text-gray-900 px-4 sm:px-6">
          {data["title"]}
        </h3>
        <span className="px-5">
          {show ? (
            <ChevronDownIcon className="w-5" />
          ) : (
            <ChevronUpIcon className="w-5" />
          )}
        </span>
      </div>
      {show && <ListTile data={data["tags"]} />}
    </div>
  ) : (
    <div></div>
  );
}

function ListTile({ data }) {
  return (
    <div className="bg-white overflow-hidden">
      <ul role="list" className="divide-y-2 divide-gray-200">
        {data &&
          data.map((tag, index) => (
            <li key={`tile-tag-` + index + tag.title}>
              <span className="block hover:bg-gray-50 px-4">
                <div className="px-4 py-4 grid lg:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <p className="text-md font-medium text-gray-800 text-left">
                      {tag.title}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex text-left">
                    <p className="inline-flex text-md text-gray-600">
                      {tag.message}
                    </p>
                  </div>
                  <div className="sm:flex text-left">
                    <p className="flex text-sm text-gray-500">
                      {tag.status === "Passed" ? (
                        <>
                          <CheckIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-white bg-green-500 rounded-full p-0.5"
                            aria-hidden="true"
                          />
                          {tag.status}
                        </>
                      ) : (
                        <>
                          <XIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-white bg-red-500 rounded-full p-0.5"
                            aria-hidden="true"
                          />
                          {tag.status}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-900 font-medium sm:mt-0">
                    {tag?.isImage ? (
                      <img
                        src={
                          tag.data?.length > 0
                            ? tag.data
                            : "https://www.messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg"
                        }
                        alt={tag.title}
                        className="lg:max-w-xs"
                      />
                    ) : (
                      <p>{tag.data}</p>
                    )}
                  </div>
                </div>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
