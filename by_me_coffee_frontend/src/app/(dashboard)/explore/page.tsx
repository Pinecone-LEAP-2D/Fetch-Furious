/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PageLoading from "@/components/PageLoading";
import { Input } from "@/components/ui/input";
import { getManyProfile } from "@/utils/request";
import { Profile } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import ProfileComp from "./_components/Profile";


const Explore = () => {
  const [name, setName] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const profileExplore = async () => {
    try {
      setIsFetching(true);
      const res = await getManyProfile(page, name);

      if (page === 1) {
        setProfiles(res.results);
      } else {
        setProfiles((prev) => [...prev, ...res.results]);
      }

      setHasMore(res.results.length > 0);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsFetching(false);
      setInitialLoading(false);
    }
  };

  const handleScroll = () => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      const container = scrollRef.current;
      if (!container) return;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);


      if (distanceFromBottom < 200 && hasMore && !isFetching) {
        setPage((prev) => prev + 1);
      }
    }, 100);
  };

  useEffect(() => {
    const container = scrollRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [hasMore, isFetching]);

  useEffect(() => {
    profileExplore();
  }, [page]);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      setPage(1);
      profileExplore();
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [name]);

  if (initialLoading) {
    return <PageLoading />;
  }

  return (
    <div
      ref={scrollRef}
      className="flex flex-col gap-8 w-full h-screen overflow-y-auto p-6 md:p-12 lg:p-24"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-xl">Explore creators</h1>
        </div>

        <Input
          className="w-full max-w-xs border rounded px-3 py-2"
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name"
          value={name}
        />

        <div className="flex flex-col gap-4 border rounded-lg p-6">
          {profiles.length === 0 && !isFetching ? (
            <div className="text-center py-8">
              <p>No profiles found. Try a different search term.</p>
            </div>
          ) : (
            profiles.map((profile, index) => (
            <ProfileComp profile={profile}  key={`${profile.userId}-${index}`} />
            ))
          )}

          {isFetching && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {!hasMore && profiles.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              No more profiles to load
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
