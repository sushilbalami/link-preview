import { mergeClassName } from "../../utils/mergeClassName";

const NormalCard = ({
  className,
  favicon,
  image,
  title,
  description,
  style,
}) => {
  return (
    <div
      className={mergeClassName(
        className,
        "flex items-center justify-center rounded-md"
      )}
      style={style}
    >
      <div className="bg-white p-4 py-2 rounded-xl max-w-xl">
        <div className="max-h-72 overflow-hidden rounded-xl mt-3">
          <img
            className="rounded-xl border border-white dark:border-gray-50 w-full h-full object-cover cursor-pointer"
            src={
              image && image.length > 0
                ? image
                : "https://www.messagetech.com/wp-content/themes/ml_mti/images/no-image.jpg"
            }
          />
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-base leading-tight">
            <span className="text-gray-700 block">
              {`${title}`.length > 0 ? `${title}` : "No Title"}
            </span>
          </div>
        </div>
        <p className="text-gray-400 text-base line-clamp-3 mt-1">
          {description && description.length > 0
            ? description
            : "No description available"}
        </p>
      </div>
    </div>
  );
};
export default NormalCard;
