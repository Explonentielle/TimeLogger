import { IssueType } from "../../../types/issue";

export class Issue {
  issue: IssueType;

  constructor(issueData: IssueType) {
    // Assignation directe des données de l'issue
    this.issue = {
      accessToken: issueData.accessToken,
      id: issueData.id,
      iid: issueData.iid,
      project_id: issueData.project_id,
      title: issueData.title,
      state: issueData.state,
      time_stats: {
        time_estimate: issueData.time_stats.time_estimate,
        total_time_spent: issueData.time_stats.total_time_spent,
        human_time_estimate: issueData.time_stats.human_time_estimate,
        human_total_time_spent: issueData.time_stats.human_total_time_spent,
      },
    };
  }

  // Méthode pour formater le temps en h et m
  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  // Méthode pour loguer le temps via l'API
  async logTime(timeSpent: number): Promise<any> {
    // const duration = this.formatDuration(timeSpent);
    const duration = "0h 30m";

    const response = await fetch(
      `https://gitlab.com/api/v4/projects/${this.issue.project_id}/issues/${this.issue.iid}/add_spent_time`,
      {
        method: "POST",
        headers: {
          "PRIVATE-TOKEN": this.issue.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ duration }),
      }
    );
    
    if (!response.ok) {
      throw new Error("Erreur lors de l'enregistrement du temps");
    }

    const data = await response.json();
    return data;
  }

  // Méthode pour récupérer les informations d'une issue si besoin
  async fetchIssue(): Promise<Issue | null> {
    const response = await fetch(
      `https://gitlab.com/api/v4/projects/${this.issue.project_id}/issues/${this.issue.iid}`,
      { headers: { Authorization: `Bearer ${this.issue.accessToken}` } }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'issue");
    }

    const data = await response.json();
    return new Issue(data);
  }
}
