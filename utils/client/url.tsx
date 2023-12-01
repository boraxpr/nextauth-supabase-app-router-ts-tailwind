import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useClientSearchParams<T extends string>(keys: Array<T>) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const values = {} as Record<T, string>;
  keys.forEach((key) => {
    values[key] = searchParams.get(key) || "";
  });

  const set = (key: T, value: string, isReplace: boolean = false) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value);
    console.log(newSearchParams.toString());
    if (isReplace) router.replace(`${pathName}?${newSearchParams.toString()}`);
    else router.push(`${pathName}?${newSearchParams.toString()}`);
  };

  const clear = (key: T, isReplace: boolean = false) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(key);
    if (isReplace) router.replace(`${pathName}?${newSearchParams.toString()}`);
    else router.push(`${pathName}?${newSearchParams.toString()}`);
  };

  const clearAll = (isReplace: boolean = false) => {
    if (isReplace) router.replace(pathName, { searchParams: "" });
    else router.push(pathName);
  };

  return { values, set, clear, clearAll };
}
