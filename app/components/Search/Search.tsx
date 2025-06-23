"use client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Search = () => {
  const [q, setQ] = useState("");
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <form onSubmit={onSubmit}
    className="flex justify-between gap-1.5 xm:gap-3.5 py-0.5 pl-3.5 pr-5 xm:pt-4 xm:pb-3.5 xm:min-w-[367px] w-full max-w-[367px] rounded bg-light-gray ">
      <button type="submit">
        <SearchIcon width={20} />
      </button>
      <input
        type="text"
        placeholder="Search"
        className="text-right w-full text-xs xm:text-[16px]"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
};

export default Search;
