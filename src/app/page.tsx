"use client"; // Next.js 13에서 클라이언트 컴포넌트로 지정

import { useState, ChangeEvent } from "react";
import {
  fetchGitHubProfile,
  GitHubProfile,
  fetchGitHubRepos,
  GitHubRepo,
} from "./api/github";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const fetchProfile = async () => {
    if (username.trim() === "") {
      setError("사용자명을 입력해주세요.");
      return;
    }

    try {
      const data = await fetchGitHubProfile(username);
      console.log("data", data);
      setProfile(data);
      setError("");
      // ✅ 프로필 불러오기 성공 시 리포지토리 목록 조회
      const repoData = await fetchGitHubRepos(username);
      setRepos(repoData);
    } catch {
      setProfile(null);
      setRepos([]);
      setError("사용자를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">OctorFinder 🐙</h1>
      <input
        className="border p-2 mb-2"
        type="text"
        placeholder="GitHub 사용자명 입력"
        value={username}
        onChange={handleChange}
      />
      <button
        onClick={fetchProfile}
        className="bg-blue-500 text-white p-2 rounded"
      >
        조회하기
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {profile && (
        <div className="mt-6 bg-white shadow-lg p-4 rounded">
          <Image
            src={profile.avatar_url}
            alt="프로필 이미지"
            className="w-20 h-20 rounded-full mb-2"
            width={200}
            height={200}
          />
          <h2 className="text-xl">{profile.name || profile.login}</h2>
          <p>{profile.bio}</p>
          <a
            href={profile.html_url}
            target="_blank"
            className="text-blue-500"
            rel="noreferrer"
          >
            GitHub 프로필 바로가기
          </a>
        </div>
      )}

      {/* ✅ 리포지토리 목록 렌더링 */}
      {repos.length > 0 && (
        <div className="mt-6 w-full max-w-2xl bg-white shadow-lg p-4 rounded">
          <h3 className="text-xl font-bold mb-4">리포지토리 목록</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id} className="border-b py-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-blue-500 font-semibold"
                  rel="noreferrer"
                >
                  {repo.name}
                </a>
                <p className="text-sm text-gray-600">
                  {repo.description || "설명 없음"}
                </p>
                <div className="text-xs text-gray-500">
                  ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
