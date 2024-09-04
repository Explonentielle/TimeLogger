export type IssueType<T extends Record<string, any> = {}> = T & {
    accessToken: string;
    id: number;
    iid: number;
    project_id: number;
    title: string;
    state: string;
    time_stats: {
      time_estimate: number | null,
      total_time_spent: number | null,
      human_time_estimate: number | null,
      human_total_time_spent: string
    },
  };