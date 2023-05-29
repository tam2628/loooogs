import classNames from "classnames";
import SearchInput from "./SearchInput";
import { playfair } from "@/lib/fonts";

export default function SearchInputWrapper() {
  return (
    <div className="mb-10">
      <div className="text-center">
        <p className={classNames("text-4xl", playfair.className)}>
          Search for posts
        </p>
      </div>
      <SearchInput />
    </div>
  );
}
