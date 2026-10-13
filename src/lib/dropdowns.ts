"use client";

import { useEffect, useMemo, useState } from "react";
import { API_URL } from "@/lib/api";

export type DropdownOption = { label: string; value: string; parentValue?: string };
export type DropdownLists<K extends string> = Record<K, DropdownOption[]>;

/** Builds options whose saved value is the text shown. */
export const toOptions = (labels: readonly string[]): DropdownOption[] => labels.map((label) => ({ label, value: label }));

/** Just the shown texts, for components that take a plain string list. */
export const labelsOf = (options: DropdownOption[]) => options.map((o) => o.label);

// One request per set of lists per page load; forms that ask for the same lists share it.
const requests = new Map<string, Promise<Record<string, DropdownOption[]>>>();

const fetchLists = (keys: string[]) => {
  const id = [...keys].sort().join(",");
  let request = requests.get(id);
  if (!request) {
    request = fetch(`${API_URL}/dropdowns?lists=${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => (body?.data && typeof body.data === "object" ? body.data : {}))
      .catch(() => {
        requests.delete(id);
        return {};
      });
    requests.set(id, request);
  }
  return request;
};

/**
 * `fallback` must be a module-level constant (its keys are the list keys to load).
 * Returns the admin's options for each list, or the fallback for that list.
 */
export function useDropdowns<K extends string>(fallback: DropdownLists<K>): DropdownLists<K> {
  const keys = useMemo(() => Object.keys(fallback) as K[], [fallback]);
  const [remote, setRemote] = useState<Partial<Record<K, DropdownOption[]>>>({});

  useEffect(() => {
    let cancelled = false;
    fetchLists(keys).then((data) => {
      if (!cancelled) setRemote(data as Partial<Record<K, DropdownOption[]>>);
    });
    return () => {
      cancelled = true;
    };
  }, [keys]);

  return useMemo(() => {
    const lists = {} as DropdownLists<K>;
    for (const key of keys) {
      const fromApi = remote[key];
      lists[key] = Array.isArray(fromApi) && fromApi.length ? fromApi : fallback[key];
    }
    return lists;
  }, [keys, remote, fallback]);
}

/** Options of a dependent list that belong to one parent value (e.g. sub-categories of a category). */
export const childrenOf = (options: DropdownOption[], parentValue: string) =>
  options.filter((o) => o.parentValue === parentValue);
