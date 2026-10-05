import { useEffect, useState } from 'react'

export type ContributionDay = {
  date: string
  count: number
  level: number
}

type LeetCodeProfile = {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
}

type LeetCodeContest = {
  rating: number
  globalRanking: number
  topPercentage: number
}

type GithubContributions = {
  total: number
  days: ContributionDay[]
}

type LiveCodingData = {
  leetcode: LeetCodeProfile | null
  contest: LeetCodeContest | null
  github: GithubContributions | null
  publicCommits: number | null
}

type LiveCodingState = LiveCodingData & { loading: boolean }

type LeetCodeProfileResponse = Partial<LeetCodeProfile>
type LeetCodeContestResponse = {
  userContestRanking?: Partial<LeetCodeContest> | null
}
type GithubResponse = {
  total?: { lastYear?: number }
  contributions?: ContributionDay[]
}
type GithubCommitSearchResponse = { total_count?: number }

const EMPTY_DATA: LiveCodingData = {
  leetcode: null,
  contest: null,
  github: null,
  publicCommits: null,
}

let cachedRequest: { expiresAt: number; promise: Promise<LiveCodingData> } | null = null

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function loadLiveCodingData(): Promise<LiveCodingData> {
  const today = new Date()
  const start = new Date(today)
  start.setUTCDate(start.getUTCDate() - 365)
  const dateRange = `${start.toISOString().slice(0, 10)}..${today.toISOString().slice(0, 10)}`
  const commitQuery = new URLSearchParams({
    q: `author:chetlasrijith author-date:${dateRange}`,
    per_page: '1',
  })

  return Promise.all([
    fetchJson<LeetCodeProfileResponse>(
      'https://leetcode-api-faisalshohag.vercel.app/thechetla'
    ),
    fetchJson<LeetCodeContestResponse>(
      'https://alfa-leetcode-api.onrender.com/userContestRankingInfo/thechetla'
    ),
    fetchJson<GithubResponse>(
      'https://github-contributions-api.jogruber.de/v4/chetlasrijith?y=last'
    ),
    fetchJson<GithubCommitSearchResponse>(
      `https://api.github.com/search/commits?${commitQuery.toString()}`
    ),
  ]).then(([profile, contestResponse, githubResponse, commitResponse]) => {
    const contest = contestResponse?.userContestRanking
    const days = githubResponse?.contributions?.filter(
      (day) => typeof day.date === 'string' && isNumber(day.count) && isNumber(day.level)
    )

    return {
      leetcode:
        profile &&
        isNumber(profile.totalSolved) &&
        isNumber(profile.easySolved) &&
        isNumber(profile.mediumSolved) &&
        isNumber(profile.hardSolved)
          ? {
              totalSolved: profile.totalSolved,
              easySolved: profile.easySolved,
              mediumSolved: profile.mediumSolved,
              hardSolved: profile.hardSolved,
            }
          : null,
      contest:
        contest &&
        isNumber(contest.rating) &&
        isNumber(contest.globalRanking) &&
          isNumber(contest.topPercentage)
          ? {
              rating: contest.rating,
              globalRanking: contest.globalRanking,
            topPercentage: contest.topPercentage,
            }
          : null,
      github:
        githubResponse && isNumber(githubResponse.total?.lastYear) && days
          ? { total: githubResponse.total.lastYear, days }
          : null,
      publicCommits: isNumber(commitResponse?.total_count)
        ? commitResponse.total_count
        : null,
    }
  })
}

function getLiveCodingData() {
  if (!cachedRequest || cachedRequest.expiresAt <= Date.now()) {
    cachedRequest = {
      expiresAt: Date.now() + 5 * 60 * 1000,
      promise: loadLiveCodingData(),
    }
  }
  return cachedRequest.promise
}

export function useLiveCodingStats(): LiveCodingState {
  const [state, setState] = useState<LiveCodingState>({ ...EMPTY_DATA, loading: true })

  useEffect(() => {
    let active = true
    getLiveCodingData().then((data) => {
      if (active) setState({ ...data, loading: false })
    })
    return () => {
      active = false
    }
  }, [])

  return state
}