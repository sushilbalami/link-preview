import { Formik, Form, Field } from "formik";
import Router from "next/router";
import Tabs from "../components/Tabs";

export default function Home() {
  return (
    <div className="relative bg-gray-50 overflow-hidden h-full">
      <div
        className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
        aria-hidden="true"
      >
        <div className="relative h-full max-w-7xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
            />
          </svg>
        </div>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24 h-screen">
        <main className="mt-12 mx-auto max-w-7xl px-4 sm:mt-20 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Grow your</span>{" "}
              <span className="block text-orange-600 xl:inline">SEO,</span>{" "}
              <span>Advanced tool</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              This tool automatically analyzes your website and tells you of any
              new errors or changes.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Formik
                  initialValues={{ url: "", headers: "" }}
                  onSubmit={(values) => {
                    Router.push(
                      `/scan?url=${values.url}&headers=${
                        values.headers.trim().length > 0 ? values.headers : "{}"
                      }`
                    );
                  }}
                >
                  {() => (
                    <Form className="mt-3 sm:flex flex-col">
                      <Tabs tabs={[{ name: "Url" }, { name: "Config" }]}>
                        <div className="sm:flex flex-row mt-8">
                          <Field
                            type="url"
                            name="url"
                            id="url"
                            className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:flex-1 border-gray-300"
                            placeholder="Enter website URL"
                          />
                          <button
                            type="submit"
                            className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                          >
                            Scan
                          </button>
                        </div>
                        <div className="sm:flex mt-8">
                          <label htmlFor="url" className="sr-only">
                            Headers
                          </label>
                          <Field
                            as="textarea"
                            name="headers"
                            id="headers"
                            className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:flex-1 border-gray-300"
                            placeholder="Headers"
                            rows={4}
                          />
                        </div>
                      </Tabs>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
